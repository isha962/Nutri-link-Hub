import json
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


BASE_DIR = Path(__file__).resolve().parent
SAMPLE_PATH = BASE_DIR / "sample_benchmark.json"


class BenchmarkTask(BaseModel):
    id: str
    task: str
    expected_behavior: str


class RunRequest(BaseModel):
    tasks: list[BenchmarkTask]


app = FastAPI(title="EvalForge API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:3000", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def load_sample_tasks() -> list[dict]:
    return json.loads(SAMPLE_PATH.read_text())


def build_workflow_output(task: BenchmarkTask, version: str) -> dict:
    failing_ids = {
        "A": {"T-102", "T-105", "T-108", "T-109"},
        "B": {"T-105", "T-108"},
    }

    partial_ids = {
        "A": {"T-104"},
        "B": {"T-109"},
    }

    failure_reasons = {
        "T-102": "Planner skipped the refund constraint and the worker produced a generic escalation.",
        "T-104": "Worker answered correctly but the reviewer wanted a clearer step-by-step structure.",
        "T-105": "Reviewer never checked grounding, so the answer invented a retention policy detail.",
        "T-108": "Planner bundled retrieval and drafting into one step, hiding the source mismatch.",
        "T-109": "Reviewer approved output without checking the required JSON shape.",
    }

    planner_notes = {
        "A": "Compact plan with a single pass over the task.",
        "B": "Compact plan with an explicit checklist for constraints and output format.",
    }

    score = 92
    status = "pass"
    failure_reason = ""

    if task.id in failing_ids[version]:
        score = 56 if version == "A" else 68
        status = "fail"
        failure_reason = failure_reasons[task.id]
    elif task.id in partial_ids[version]:
        score = 79 if version == "A" else 82
        status = "warn"
        failure_reason = failure_reasons[task.id]

    worker_output = (
        f"{version} output for {task.id}: followed the task with "
        f"{'stronger constraint handling' if version == 'B' else 'lightweight reasoning'}."
    )
    if status == "fail":
        worker_output = f"{version} output for {task.id}: response drifted from the expected behavior."

    trace = [
        {
            "stage": "planner",
            "content": f"{planner_notes[version]} Expected behavior: {task.expected_behavior}",
        },
        {
            "stage": "worker",
            "content": worker_output,
        },
        {
            "stage": "reviewer",
            "content": (
                "Reviewer flagged missing constraints."
                if status == "fail"
                else "Reviewer approved the answer with a brief rubric check."
            ),
        },
    ]

    return {
        "task_id": task.id,
        "status": status,
        "score": score,
        "failure_reason": failure_reason,
        "input": {
            "task": task.task,
            "expected_behavior": task.expected_behavior,
        },
        "trace": trace,
        "output": worker_output,
        "score_explanation": (
            "Scored high because the planner preserved the constraints, the worker stayed on-task, "
            "and the reviewer validated the structure."
            if status == "pass"
            else "Score dropped because one of the workflow stages missed an explicit requirement, "
            "creating a predictable failure that the reviewer did not fully catch."
        ),
    }


def summarize(results: list[dict], version: str) -> dict:
    average = round(sum(item["score"] for item in results) / len(results), 1)
    failures = [item for item in results if item["status"] == "fail"]
    warnings = [item for item in results if item["status"] == "warn"]
    return {
        "version": version,
        "average_score": average,
        "pass_count": len([item for item in results if item["status"] == "pass"]),
        "warn_count": len(warnings),
        "fail_count": len(failures),
    }


def build_suggested_fixes(results_a: list[dict], results_b: list[dict]) -> list[str]:
    failing_ids = {
        item["task_id"]
        for item in [*results_a, *results_b]
        if item["status"] != "pass"
    }
    suggestions = []

    if {"T-102", "T-105"} & failing_ids:
        suggestions.append("Tighten reviewer instructions so they explicitly verify policy constraints before approval.")
    if {"T-108"} & failing_ids:
        suggestions.append("Split retrieval from drafting so source mismatches are visible earlier in the trace.")
    if {"T-109", "T-104"} & failing_ids:
        suggestions.append("Add an output-format checklist in the planner to catch JSON shape and structure requirements.")

    return suggestions


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.get("/benchmark/sample")
def sample_benchmark() -> dict:
    return {"tasks": load_sample_tasks()}


@app.post("/run")
def run_eval(payload: RunRequest) -> dict:
    results_a = [build_workflow_output(task, "A") for task in payload.tasks]
    results_b = [build_workflow_output(task, "B") for task in payload.tasks]

    comparison = []
    for result_a, result_b in zip(results_a, results_b):
        comparison.append(
            {
                "task_id": result_a["task_id"],
                "score_a": result_a["score"],
                "score_b": result_b["score"],
                "delta": result_b["score"] - result_a["score"],
            }
        )

    return {
        "run_summary": summarize(results_a, "A"),
        "results": results_a,
        "comparison_summary": {
            "A": summarize(results_a, "A"),
            "B": summarize(results_b, "B"),
            "score_delta": round(
                summarize(results_b, "B")["average_score"] - summarize(results_a, "A")["average_score"],
                1,
            ),
        },
        "comparison": comparison,
        "suggested_fixes": build_suggested_fixes(results_a, results_b),
    }
