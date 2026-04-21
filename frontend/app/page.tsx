"use client";

import { useMemo, useState } from "react";
import type { ChangeEvent, CSSProperties } from "react";

type Task = {
  id: string;
  task: string;
  expected_behavior: string;
};

type TraceEntry = {
  stage: string;
  content: string;
};

type RunResult = {
  task_id: string;
  status: "pass" | "warn" | "fail";
  score: number;
  failure_reason: string;
  input: {
    task: string;
    expected_behavior: string;
  };
  trace: TraceEntry[];
  output: string;
  score_explanation: string;
};

type ComparisonRow = {
  task_id: string;
  score_a: number;
  score_b: number;
  delta: number;
};

type ApiResponse = {
  run_summary: {
    average_score: number;
    pass_count: number;
    warn_count: number;
    fail_count: number;
  };
  results: RunResult[];
  comparison_summary: {
    A: {
      average_score: number;
    };
    B: {
      average_score: number;
    };
    score_delta: number;
  };
  comparison: ComparisonRow[];
  suggested_fixes: string[];
};

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000").replace(/\/$/, "");
const STAGE_ORDER = ["planner", "worker", "reviewer"] as const;

type StageName = (typeof STAGE_ORDER)[number];
type StageStatus = "pass" | "warn" | "fail";

function getStageRole(stage: StageName) {
  if (stage === "planner") {
    return "Break the task into a crisp execution plan.";
  }
  if (stage === "worker") {
    return "Produce the mock answer from the current plan.";
  }
  return "Check constraints, grounding, and output format.";
}

function getStageStatus(result: RunResult, stage: StageName): StageStatus {
  const reason = result.failure_reason.toLowerCase();

  if (stage === "planner") {
    if (reason.includes("planner")) {
      return result.status === "warn" ? "warn" : "fail";
    }
    return "pass";
  }

  if (stage === "worker") {
    if (reason.includes("worker")) {
      return result.status === "warn" ? "warn" : "fail";
    }
    if (result.status === "warn" && result.output.toLowerCase().includes("followed the task")) {
      return "pass";
    }
    return result.status === "fail" && !reason.includes("planner") && !reason.includes("reviewer") ? "fail" : "pass";
  }

  if (reason.includes("reviewer")) {
    return result.status === "warn" ? "warn" : "fail";
  }

  return result.status === "pass" ? "pass" : "warn";
}

function buildStageView(result: RunResult) {
  return STAGE_ORDER.map((stage) => ({
    name: stage,
    role: getStageRole(stage),
    status: getStageStatus(result, stage),
    summary: result.trace.find((entry) => entry.stage === stage)?.content ?? "No trace captured for this stage.",
  }));
}

function parseCsv(text: string): Task[] {
  const lines = text.trim().split(/\r?\n/);
  const [, ...rows] = lines;
  return rows
    .map((line) => line.split(","))
    .filter((parts) => parts.length >= 3)
    .map(([id, task, expected_behavior]) => ({
      id: id.trim(),
      task: task.trim(),
      expected_behavior: expected_behavior.trim(),
    }));
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [results, setResults] = useState<RunResult[]>([]);
  const [comparison, setComparison] = useState<ComparisonRow[]>([]);
  const [comparisonSummary, setComparisonSummary] = useState<ApiResponse["comparison_summary"] | null>(null);
  const [suggestedFixes, setSuggestedFixes] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Load the sample benchmark or upload a tiny CSV/JSON file.");
  const [loadedSource, setLoadedSource] = useState<"sample" | "upload" | null>(null);
  const [resultFilter, setResultFilter] = useState<"all" | "flagged" | "passed">("all");

  const selectedResult = useMemo(
    () => results.find((result) => result.task_id === selectedId) ?? results[0] ?? null,
    [results, selectedId],
  );
  const stageView = selectedResult ? buildStageView(selectedResult) : [];
  const chartStats = useMemo(() => {
    const passCount = results.filter((result) => result.status === "pass").length;
    const nonPassCount = results.length - passCount;
    const passAngle = results.length ? Math.round((passCount / results.length) * 360) : 0;
    return { passCount, nonPassCount, passAngle };
  }, [results]);
  const hasBenchmark = tasks.length > 0;
  const hasResults = results.length > 0;
  const filteredResults = useMemo(() => {
    if (resultFilter === "flagged") {
      return results.filter((result) => result.status !== "pass");
    }
    if (resultFilter === "passed") {
      return results.filter((result) => result.status === "pass");
    }
    return results;
  }, [resultFilter, results]);
  const stepStates = {
    load: hasBenchmark ? "completed" : "active",
    run: loading ? "active" : hasResults ? "completed" : hasBenchmark ? "active" : "pending",
    inspect: hasResults ? (selectedResult ? "completed" : "active") : "pending",
  } as const;

  async function loadSample() {
    setMessage("Loading sample benchmark...");
    const response = await fetch(`${API_BASE}/benchmark/sample`);
    const data = (await response.json()) as { tasks: Task[] };
    setTasks(data.tasks);
    setResults([]);
    setComparison([]);
    setSuggestedFixes([]);
    setSelectedId(data.tasks[0]?.id ?? null);
    setLoadedSource("sample");
    setMessage(`Loaded ${data.tasks.length} benchmark tasks.`);
  }

  async function runEval() {
    if (!tasks.length) {
      setMessage("Load or upload tasks first.");
      return;
    }

    setLoading(true);
    setMessage("Running deterministic mock eval...");
    const response = await fetch(`${API_BASE}/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tasks }),
    });
    const data = (await response.json()) as ApiResponse;
    setResults(data.results);
    setComparison(data.comparison);
    setComparisonSummary(data.comparison_summary);
    setSuggestedFixes(data.suggested_fixes);
    setSelectedId(data.results[0]?.task_id ?? null);
    setLoading(false);
    setMessage(
      `Run complete. ${data.run_summary.fail_count} fails, ${data.run_summary.warn_count} warnings, average ${data.run_summary.average_score}.`,
    );
  }

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const text = await file.text();
    const nextTasks = file.name.endsWith(".json") ? (JSON.parse(text) as Task[]) : parseCsv(text);
    setTasks(nextTasks);
    setResults([]);
    setComparison([]);
    setSuggestedFixes([]);
    setSelectedId(nextTasks[0]?.id ?? null);
    setLoadedSource("upload");
    setMessage(`Loaded ${nextTasks.length} tasks from ${file.name}.`);
  }

  return (
    <main className="page-shell">
      <section className={`hero ${hasBenchmark ? "is-collapsed" : ""}`}>
        <div className="hero-copy-block">
          <p className="eyebrow">Portfolio MVP</p>
          <h1>EvalForge</h1>
          <p className="hero-copy">
            A tiny local workbench for testing agent workflows. Load a benchmark, run a mock planner-worker-reviewer
            pipeline, inspect failures, and compare prompt versions in under three minutes.
          </p>
        </div>
        <div className="workflow-panel">
          <div className="workflow-header">
            <div>
              <p className="section-kicker">Workflow</p>
              <h2>Load, run, inspect</h2>
            </div>
            <span className="pill">
              {tasks.length ? `${tasks.length} loaded` : "Awaiting benchmark"}
            </span>
          </div>
          <div className="workflow-steps">
            <div className={`workflow-step is-${stepStates.load}`}>
              <div className="workflow-step-head">
                <span className={`workflow-step-number is-${stepStates.load}`}>
                  {stepStates.load === "completed" ? "Done" : "Step 1"}
                </span>
                <h3>Load benchmark</h3>
              </div>
              <p className="workflow-helper">Load the sample set or upload a tiny CSV/JSON file.</p>
              <div className="workflow-actions">
                <button
                  className={`primary-button ${loadedSource === "sample" ? "is-success" : ""}`}
                  onClick={loadSample}
                  type="button"
                >
                  Load Sample Benchmark
                </button>
                <label className={`secondary-button ${loadedSource === "upload" ? "is-success" : ""}`}>
                  Upload CSV or JSON
                  <input accept=".csv,.json" onChange={handleUpload} type="file" />
                </label>
              </div>
            </div>

            <div className={`workflow-step is-${stepStates.run}`}>
              <div className="workflow-step-head">
                <span className={`workflow-step-number is-${stepStates.run}`}>
                  {stepStates.run === "completed" ? "Done" : "Step 2"}
                </span>
                <h3>Run evaluation</h3>
              </div>
              <p className="workflow-helper">Run the deterministic planner, worker, and reviewer flow.</p>
              <div className="workflow-actions single-action">
                <button
                  className={`ghost-button ${loading ? "is-running" : ""} ${results.length > 0 && !loading ? "is-success" : ""}`}
                  onClick={runEval}
                  type="button"
                  disabled={loading || !tasks.length}
                >
                  {loading ? "Running..." : "Run Eval"}
                </button>
              </div>
            </div>

            <div className={`workflow-step is-${stepStates.inspect}`}>
              <div className="workflow-step-head">
                <span className={`workflow-step-number is-${stepStates.inspect}`}>
                  {stepStates.inspect === "completed" ? "Done" : "Step 3"}
                </span>
                <h3>Inspect results</h3>
              </div>
              <p className="workflow-helper">
                Review the results table, score summary, and Planner / Worker / Reviewer trace below.
              </p>
            </div>
          </div>
          <p className="status-line">{message}</p>
        </div>
      </section>

      <section className="dashboard">
        <div className="card benchmark-card">
          <div className="section-header">
            <div>
              <p className="section-kicker">Benchmark / Tasks</p>
              <h2>Task Set</h2>
            </div>
            <span className="pill">{tasks.length} tasks</span>
          </div>
          <div className="task-list">
            {tasks.length ? (
              tasks.map((task) => (
                <button
                  key={task.id}
                  className={`task-item ${selectedResult?.task_id === task.id ? "selected" : ""}`}
                  onClick={() => setSelectedId(task.id)}
                  type="button"
                >
                  <div className="task-item-top">
                    <strong className="task-id-badge">{task.id}</strong>
                  </div>
                  <span className="task-label">{task.task}</span>
                </button>
              ))
            ) : (
              <p className="empty-state">No tasks loaded yet.</p>
            )}
          </div>
        </div>

        <div className="card results-card">
          <div className="section-header">
            <div>
              <p className="section-kicker">Run Results</p>
              <h2>Version A Results</h2>
            </div>
            {comparisonSummary ? (
              <span className="pill">Avg {comparisonSummary.A.average_score}</span>
            ) : (
              <span className="pill muted">Awaiting run</span>
            )}
          </div>
          <div className="result-filters" role="tablist" aria-label="Run result filters">
            <button
              className={`filter-chip ${resultFilter === "all" ? "selected" : ""}`}
              onClick={() => setResultFilter("all")}
              type="button"
            >
              All
            </button>
            <button
              className={`filter-chip ${resultFilter === "flagged" ? "selected" : ""}`}
              onClick={() => setResultFilter("flagged")}
              type="button"
            >
              Flagged
            </button>
            <button
              className={`filter-chip ${resultFilter === "passed" ? "selected" : ""}`}
              onClick={() => setResultFilter("passed")}
              type="button"
            >
              Passed
            </button>
          </div>
          <div className="results-summary-card">
            <div>
              <p className="section-kicker">Run Snapshot</p>
              <h3>Pass vs flagged tasks</h3>
            </div>
            <div className="results-summary-body">
              <div
                className="mini-donut"
                style={{ "--pass-angle": `${chartStats.passAngle}deg` } as CSSProperties}
              >
                <span>{results.length ? `${chartStats.passCount}/${results.length}` : "0/0"}</span>
              </div>
              <div className="mini-legend">
                <div>
                  <span className="legend-dot pass-dot" />
                  <p>Pass</p>
                  <strong>{chartStats.passCount}</strong>
                </div>
                <div>
                  <span className="legend-dot fail-dot" />
                  <p>Warn / Fail</p>
                  <strong>{chartStats.nonPassCount}</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="results-table">
            <div className="results-head">
              <span>Task</span>
              <span>Status</span>
              <span>Score</span>
              <span>Failure Reason</span>
            </div>
            {filteredResults.length ? (
              filteredResults.map((result) => (
                <button
                  key={result.task_id}
                  className={`results-row ${selectedResult?.task_id === result.task_id ? "selected" : ""}`}
                  onClick={() => setSelectedId(result.task_id)}
                  type="button"
                >
                  <span className="result-task-id">{result.task_id}</span>
                  <span className={`badge ${result.status}`}>{result.status}</span>
                  <span>{result.score}</span>
                  <span>{result.failure_reason || "Passed checks"}</span>
                </button>
              ))
            ) : hasResults ? (
              <p className="empty-state">No tasks match the current filter.</p>
            ) : (
              <p className="empty-state">Run the eval to populate results.</p>
            )}
          </div>
        </div>

        <div className="card analysis-card">
          <div className="section-header">
            <div>
              <p className="section-kicker">Failure Analysis / Suggested Fixes</p>
              <h2>Debug View</h2>
            </div>
          </div>

          {selectedResult ? (
            <div className="detail-panel">
              <div className="detail-block">
                <div className="pipeline-header">
                  <div>
                    <p className="section-kicker">Workflow</p>
                    <h3>Planner - Worker - Reviewer</h3>
                  </div>
                  <span className={`badge ${selectedResult.status}`}>{selectedResult.status}</span>
                </div>
                <div className="pipeline-rail">
                  {stageView.map((stage, index) => (
                    <div className="pipeline-node" key={stage.name}>
                      <div className={`pipeline-index ${stage.status}`}>{index + 1}</div>
                      <div className={`pipeline-line ${stage.status}`} />
                      <div className="pipeline-copy">
                        <strong>{stage.name}</strong>
                        <span>{stage.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="stage-grid">
                  {stageView.map((stage, index) => (
                    <div className={`stage-card ${stage.status}`} key={stage.name}>
                      <div className="stage-card-top">
                        <div>
                          <p className="stage-step">Step {index + 1}</p>
                          <h4>{stage.name}</h4>
                        </div>
                        <span className={`badge ${stage.status}`}>{stage.status}</span>
                      </div>
                      <p className="stage-role">{stage.role}</p>
                      <p className="stage-summary">{stage.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="detail-block">
                <h3>Input</h3>
                <p>{selectedResult.input.task}</p>
                <small>{selectedResult.input.expected_behavior}</small>
              </div>
              <div className="detail-block">
                <h3>Trace Details</h3>
                {selectedResult.trace.map((entry) => (
                  <div className="trace-row" key={`${selectedResult.task_id}-${entry.stage}`}>
                    <span>{entry.stage}</span>
                    <p>{entry.content}</p>
                  </div>
                ))}
              </div>
              <div className="detail-block">
                <h3>Output</h3>
                <p>{selectedResult.output}</p>
              </div>
              <div className="detail-block">
                <h3>Score Explanation</h3>
                <p>{selectedResult.score_explanation}</p>
              </div>
            </div>
          ) : (
            <p className="empty-state">Select a task after running the eval to inspect the trace.</p>
          )}

          <div className="comparison-panel">
            <div className="comparison-header">
              <h3>Prompt Version A vs B</h3>
              {comparisonSummary ? <span className="delta-chip">Delta +{comparisonSummary.score_delta}</span> : null}
            </div>
            {comparisonSummary ? (
              <>
                <p className="comparison-summary">
                  Version A average: {comparisonSummary.A.average_score} | Version B average:{" "}
                  {comparisonSummary.B.average_score}
                </p>
                <div className="comparison-table">
                  {comparison.map((row) => (
                    <div className="comparison-row" key={row.task_id}>
                      <span>{row.task_id}</span>
                      <span>A {row.score_a}</span>
                      <span>B {row.score_b}</span>
                      <strong>{row.delta >= 0 ? `+${row.delta}` : row.delta}</strong>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="empty-state">Comparison appears after a run.</p>
            )}
          </div>

          <div className="fixes-panel">
            <h3>Suggested Fixes</h3>
            {suggestedFixes.length ? (
              suggestedFixes.map((fix) => <p key={fix}>{fix}</p>)
            ) : (
              <p className="empty-state">Fix recommendations appear after the run.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
