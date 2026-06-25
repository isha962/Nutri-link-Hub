export const versionReliability = [
  { version: "v1", reliability: 71 },
  { version: "v2", reliability: 82 },
  { version: "v3", reliability: 89 },
] as const;

export const failureCategories = [
  "Hallucination",
  "Missing evidence",
  "Incorrect action",
  "Incomplete workflow",
  "None",
] as const;

export const recommendations = [
  "Ready to deploy",
  "Needs human review",
  "Add retrieval verification",
  "Regression test before release",
] as const;

export type FailureCategory = (typeof failureCategories)[number];
export type DeploymentRecommendation = (typeof recommendations)[number];
export type AgentRunStatus = "pass" | "fail" | "review";
export type VersionLabel = "v1" | "v2" | "v3";

type RawAgentRun = {
  run_id: string;
  agent_name: string;
  version: VersionLabel;
  timestamp: string;
  input: string;
  output: string;
  expected_behavior: string;
  score: number;
  confidence: number;
};

export type AgentRun = RawAgentRun & {
  status: AgentRunStatus;
  failure_category: FailureCategory;
  recommendation: DeploymentRecommendation;
};

const rawAgentRuns: RawAgentRun[] = [
  {
    run_id: "run-1001",
    agent_name: "Search Router",
    version: "v1",
    timestamp: "2026-06-18T13:10:00Z",
    input: "Answer whether the refunds policy requires manager approval.",
    output: "Manager approval is always required for all refunds.",
    expected_behavior: "Cite the policy source and avoid inventing exceptions.",
    score: 66,
    confidence: 0.57,
  },
  {
    run_id: "run-1002",
    agent_name: "Incident Orchestrator",
    version: "v1",
    timestamp: "2026-06-18T13:24:00Z",
    input: "Escalate a P1 outage to the on-call engineer.",
    output: "Mark the outage as resolved and close the ticket.",
    expected_behavior: "Escalate to on-call and keep the incident open.",
    score: 70,
    confidence: 0.66,
  },
  {
    run_id: "run-1003",
    agent_name: "Evidence Miner",
    version: "v1",
    timestamp: "2026-06-18T13:38:00Z",
    input: "Summarize the security review notes.",
    output: "I cannot confirm the source, but the report says the review passed cleanly.",
    expected_behavior: "Summarize only the evidence in the notes.",
    score: 68,
    confidence: 0.58,
  },
  {
    run_id: "run-1004",
    agent_name: "Workflow Guard",
    version: "v1",
    timestamp: "2026-06-18T13:52:00Z",
    input: "Complete the 3-step intake workflow.",
    output: "Step 1 complete. Step 2 complete.",
    expected_behavior: "Complete all 3 steps in order.",
    score: 72,
    confidence: 0.73,
  },
  {
    run_id: "run-1005",
    agent_name: "Search Router",
    version: "v2",
    timestamp: "2026-06-19T10:08:00Z",
    input: "Answer whether the refunds policy requires manager approval.",
    output: "The policy requires support review within 7 days, but I cannot confirm the source document.",
    expected_behavior: "Cite the policy source and avoid inventing exceptions.",
    score: 79,
    confidence: 0.74,
  },
  {
    run_id: "run-1006",
    agent_name: "Incident Orchestrator",
    version: "v2",
    timestamp: "2026-06-19T10:21:00Z",
    input: "Escalate a P1 outage to the on-call engineer.",
    output: "Escalate to on-call, attach logs, and keep the incident open.",
    expected_behavior: "Escalate to on-call and keep the incident open.",
    score: 84,
    confidence: 0.88,
  },
  {
    run_id: "run-1007",
    agent_name: "Evidence Miner",
    version: "v2",
    timestamp: "2026-06-19T10:34:00Z",
    input: "Summarize the security review notes.",
    output: "The notes mention a change request and a follow-up audit on June 24.",
    expected_behavior: "Summarize only the evidence in the notes.",
    score: 82,
    confidence: 0.84,
  },
  {
    run_id: "run-1008",
    agent_name: "Workflow Guard",
    version: "v2",
    timestamp: "2026-06-19T10:47:00Z",
    input: "Complete the 3-step intake workflow.",
    output: "Step 1 complete, step 2 complete, step 3 complete.",
    expected_behavior: "Complete all 3 steps in order.",
    score: 83,
    confidence: 0.91,
  },
  {
    run_id: "run-1009",
    agent_name: "Search Router",
    version: "v3",
    timestamp: "2026-06-20T09:11:00Z",
    input: "Answer whether the refunds policy requires manager approval.",
    output: "The policy says refunds need review within 7 days and support approval before processing.",
    expected_behavior: "Cite the policy source and avoid inventing exceptions.",
    score: 89,
    confidence: 0.95,
  },
  {
    run_id: "run-1010",
    agent_name: "Incident Orchestrator",
    version: "v3",
    timestamp: "2026-06-20T09:24:00Z",
    input: "Escalate a P1 outage to the on-call engineer.",
    output: "Escalate to on-call, attach logs, and keep the incident open until acknowledged.",
    expected_behavior: "Escalate to on-call and keep the incident open.",
    score: 91,
    confidence: 0.93,
  },
  {
    run_id: "run-1011",
    agent_name: "Evidence Miner",
    version: "v3",
    timestamp: "2026-06-20T09:37:00Z",
    input: "Summarize the security review notes.",
    output: "The notes mention a change request and a follow-up audit on June 30.",
    expected_behavior: "Summarize only the evidence in the notes.",
    score: 74,
    confidence: 0.82,
  },
  {
    run_id: "run-1012",
    agent_name: "Workflow Guard",
    version: "v3",
    timestamp: "2026-06-20T09:50:00Z",
    input: "Complete the 3-step intake workflow.",
    output: "Complete the 3-step intake workflow, then notify the owner.",
    expected_behavior: "Complete all 3 steps in order.",
    score: 90,
    confidence: 0.94,
  },
];

function classifyFailureCategory(run: RawAgentRun): FailureCategory {
  const expected = run.expected_behavior.toLowerCase();
  const output = run.output.toLowerCase();
  const combined = `${run.input} ${run.expected_behavior} ${run.output}`.toLowerCase();

  if (
    /always|required for all|invent|invented|made up|unsupported|hallucinat/.test(combined) ||
    (expected.includes("june 24") && output.includes("june 30"))
  ) {
    return "Hallucination";
  }

  if (
    /cite|source|evidence|ground/.test(expected) &&
    (/cannot confirm|no source|without a source|missing evidence/.test(output) || run.confidence < 0.7)
  ) {
    return "Missing evidence";
  }

  if (/escalate|open|deploy|approve|route|close the ticket|mark the outage as resolved/.test(output)) {
    if (/keep the incident open|escalate to on-call/.test(expected) && output.includes("close the ticket")) {
      return "Incorrect action";
    }
    if (/close the ticket|mark the outage as resolved/.test(output) && expected.includes("escalate")) {
      return "Incorrect action";
    }
  }

  if (/step 1|step 2|step 3|workflow/.test(expected) && /step 1 complete\. step 2 complete\./.test(output)) {
    return "Incomplete workflow";
  }

  return "None";
}

function recommendDeployment(run: RawAgentRun, failureCategory: FailureCategory, previousScore?: number): DeploymentRecommendation {
  if (previousScore !== undefined && previousScore - run.score >= 6) {
    return "Regression test before release";
  }

  if (run.confidence < 0.7) {
    return "Needs human review";
  }

  if (failureCategory === "Hallucination" || failureCategory === "Missing evidence") {
    return "Add retrieval verification";
  }

  if (failureCategory === "Incorrect action" || failureCategory === "Incomplete workflow") {
    return "Regression test before release";
  }

  if (run.score >= 85 && run.confidence >= 0.9 && failureCategory === "None") {
    return "Ready to deploy";
  }

  return "Needs human review";
}

function statusFromRecommendation(recommendation: DeploymentRecommendation): AgentRunStatus {
  if (recommendation === "Ready to deploy") {
    return "pass";
  }
  if (recommendation === "Needs human review") {
    return "review";
  }
  return "fail";
}

function buildRuns(rawRuns: RawAgentRun[]): AgentRun[] {
  const previousScores = new Map<string, number>();

  return rawRuns.map((run) => {
    const failureCategory = classifyFailureCategory(run);
    const previousScore = previousScores.get(run.agent_name);
    const recommendation = recommendDeployment(run, failureCategory, previousScore);

    previousScores.set(run.agent_name, run.score);

    return {
      ...run,
      failure_category: failureCategory,
      recommendation,
      status: statusFromRecommendation(recommendation),
    };
  });
}

export const seedAgentRuns = buildRuns(rawAgentRuns);

export function buildOperationsSummary(runs: AgentRun[] = seedAgentRuns) {
  const totalRuns = runs.length;
  const passRuns = runs.filter((run) => run.status === "pass").length;
  const reviewRuns = runs.filter((run) => run.status === "review").length;
  const successRate = totalRuns ? Math.round((passRuns / totalRuns) * 100) : 0;

  const categoryCounts = failureCategories.map((category) => ({
    category,
    count: runs.filter((run) => run.failure_category === category).length,
  }));

  const recommendationCounts = recommendations.map((recommendation) => ({
    recommendation,
    count: runs.filter((run) => run.recommendation === recommendation).length,
  }));

  const latestVersionRuns = runs.filter((run) => run.version === "v3");
  const decisionPriority: DeploymentRecommendation[] = [
    "Regression test before release",
    "Add retrieval verification",
    "Needs human review",
    "Ready to deploy",
  ];
  const recommendedAction =
    decisionPriority.find((item) => latestVersionRuns.some((run) => run.recommendation === item)) ?? "Needs human review";

  return {
    totalRuns,
    successRate,
    passRuns,
    reviewRuns,
    categoryCounts,
    recommendationCounts,
    recommendedAction,
    latestVersionRuns,
    versionTrend: versionReliability,
  };
}
