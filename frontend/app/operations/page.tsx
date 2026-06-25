import Link from "next/link";
import {
  buildOperationsSummary,
  failureCategories,
  seedAgentRuns,
  versionReliability,
} from "../../lib/operations-data";

function formatPercent(value: number) {
  return `${value}%`;
}

function getDecisionTone(action: string) {
  if (action === "Ready to deploy") {
    return "pass";
  }
  if (action === "Needs human review") {
    return "review";
  }
  return "fail";
}

const recommendedActions = [
  {
    icon: "🔴",
    tone: "fail",
    title: "3 agent runs require human review",
    explanation: "Three low-confidence runs need operator review before deployment.",
    owner: "Owner: AI Ops",
  },
  {
    icon: "🟡",
    tone: "review",
    title: "Retrieval verification recommended for Finance Agent",
    explanation: "The Finance Agent showed evidence risk, so retrieval checks should be tightened.",
    owner: "Owner: Retrieval Team",
  },
  {
    icon: "🟢",
    tone: "pass",
    title: "Customer Support Agent v3 approved for deployment",
    explanation: "The latest support workflow cleared the threshold for a deployment-ready posture.",
    owner: "Owner: Customer Support",
  },
  {
    icon: "🔵",
    tone: "pass",
    title: "Reliability improved +8 points since previous version",
    explanation: "Version reliability increased from 82 to 90, confirming a stronger release candidate.",
    owner: "Owner: Platform Reliability",
  },
] as const;

export default function OperationsPage() {
  const summary = buildOperationsSummary(seedAgentRuns);
  const maxCategoryCount = Math.max(...summary.categoryCounts.map((item) => item.count), 1);
  const linePoints = versionReliability
    .map((point, index) => `${40 + index * 150},${200 - (point.reliability - 60) * 4}`)
    .join(" ");

  return (
    <main className="page-shell operations-shell">
      <header className="ops-hero">
        <div>
          <p className="eyebrow">AI Deployment Control Tower</p>
          <h1>Operations View</h1>
          <p className="hero-copy">
            Turn agent evaluation results into deployment decisions with a reliability-first workflow for operators.
          </p>
        </div>
        <div className="ops-hero-actions">
          <span className={`badge ${getDecisionTone(summary.recommendedAction)}`}>{summary.recommendedAction}</span>
          <Link className="ghost-button" href="/">
            Back to EvalForge
          </Link>
        </div>
      </header>

      <section className="ops-metrics">
        <article className="ops-card ops-metric">
          <p className="section-kicker">Operational status</p>
          <strong>{summary.totalRuns}</strong>
          <span>Total agent runs</span>
        </article>
        <article className="ops-card ops-metric">
          <p className="section-kicker">Success rate</p>
          <strong>{formatPercent(summary.successRate)}</strong>
          <span>Passes across the current control set</span>
        </article>
        <article className="ops-card ops-metric">
          <p className="section-kicker">Review queue</p>
          <strong>{summary.reviewRuns}</strong>
          <span>Runs needing human review</span>
        </article>
        <article className="ops-card ops-metric">
          <p className="section-kicker">Deployment stance</p>
          <strong>{summary.recommendedAction}</strong>
          <span>Recommended next action</span>
        </article>
      </section>

      <section className="ops-card ops-actions-panel">
        <div className="section-header">
          <div>
            <p className="section-kicker">Recommended Next Actions</p>
            <h2>Operational dispatch queue</h2>
          </div>
          <span className="pill">Command center view</span>
        </div>
        <div className="ops-actions-grid">
          {recommendedActions.map((item) => (
            <article key={item.title} className={`ops-action-card ${item.tone}`}>
              <div className="ops-action-top">
                <span className="ops-action-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <span className={`badge ${item.tone}`}>{item.tone === "pass" ? "Approved" : item.tone === "review" ? "Review" : "Escalate"}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.explanation}</p>
              <span className="ops-action-owner">{item.owner}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="ops-grid ops-grid-2">
        <article className="ops-card">
          <div className="section-header">
            <div>
              <p className="section-kicker">Version reliability trend</p>
              <h2>Iteration over time</h2>
            </div>
            <span className="pill">v1 → v2 → v3</span>
          </div>
          <svg className="ops-line-chart" viewBox="0 0 480 240" role="img" aria-label="Reliability trend chart">
            <defs>
              <linearGradient id="trendGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(119, 224, 198, 0.45)" />
                <stop offset="100%" stopColor="rgba(119, 224, 198, 0)" />
              </linearGradient>
            </defs>
            <polyline points="40,200 190,152 340,124" fill="none" stroke="#77e0c6" strokeWidth="4" />
            <polyline points="40,200 190,152 340,124 340,240 40,240" fill="url(#trendGlow)" opacity="0.2" />
            {versionReliability.map((point, index) => (
              <g key={point.version}>
                <circle cx={40 + index * 150} cy={200 - (point.reliability - 60) * 4} r="6" fill="#77e0c6" />
                <text x={40 + index * 150} y="222" fill="#97a0ad" textAnchor="middle" fontSize="12">
                  {point.version}
                </text>
                <text
                  x={40 + index * 150}
                  y={200 - (point.reliability - 60) * 4 - 14}
                  fill="#f3f5f7"
                  textAnchor="middle"
                  fontSize="12"
                >
                  {point.reliability}
                </text>
              </g>
            ))}
          </svg>
        </article>

        <article className="ops-card">
          <div className="section-header">
            <div>
              <p className="section-kicker">Failure modes</p>
              <h2>Classification breakdown</h2>
            </div>
            <span className="pill">Rule-based evaluator</span>
          </div>
          <div className="ops-breakdown">
            {summary.categoryCounts.map((item) => {
              const width = (item.count / maxCategoryCount) * 100;
              return (
                <div className="ops-breakdown-row" key={item.category}>
                  <div className="ops-breakdown-label">
                    <span>{item.category}</span>
                    <strong>{item.count}</strong>
                  </div>
                  <div className="ops-breakdown-bar">
                    <span style={{ width: `${width}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      </section>

      <section className="ops-grid ops-grid-2">
        <article className="ops-card">
          <div className="section-header">
            <div>
              <p className="section-kicker">Deployment readiness</p>
              <h2>Recommended action</h2>
            </div>
            <span className={`badge ${getDecisionTone(summary.recommendedAction)}`}>{summary.recommendedAction}</span>
          </div>
          <div className="ops-readiness">
            <p>
              The latest version is improving, but the control tower still sees enough risk to recommend a cautious
              operational posture.
            </p>
            <div className="ops-readiness-list">
              {summary.recommendationCounts.map((item) => (
                <div key={item.recommendation} className="ops-readiness-item">
                  <span>{item.recommendation}</span>
                  <strong>{item.count}</strong>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="ops-card">
          <div className="section-header">
            <div>
              <p className="section-kicker">Version comparison</p>
              <h2>Reliability by release</h2>
            </div>
            <span className="pill">v1 71 | v2 82 | v3 89</span>
          </div>
          <div className="ops-version-list">
            {versionReliability.map((point, index) => {
              const prev = versionReliability[index - 1]?.reliability;
              const delta = prev === undefined ? 0 : point.reliability - prev;
              return (
                <div className="ops-version-row" key={point.version}>
                  <div>
                    <strong>{point.version}</strong>
                    <span>{point.reliability} reliability score</span>
                  </div>
                  <span className={delta >= 0 ? "ops-delta positive" : "ops-delta negative"}>
                    {index === 0 ? "baseline" : delta >= 0 ? `+${delta}` : `${delta}`}
                  </span>
                </div>
              );
            })}
          </div>
        </article>
      </section>

      <section className="ops-card">
        <div className="section-header">
          <div>
            <p className="section-kicker">Operational ledger</p>
            <h2>Agent runs and classifications</h2>
          </div>
          <span className="pill">12 seeded runs</span>
        </div>
        <div className="ops-ledger">
          <div className="ops-ledger-head">
            <span>Run</span>
            <span>Agent</span>
            <span>Version</span>
            <span>Status</span>
            <span>Score</span>
            <span>Failure category</span>
            <span>Confidence</span>
            <span>Recommendation</span>
          </div>
          {seedAgentRuns.map((run) => (
            <div className="ops-ledger-row" key={run.run_id}>
              <span className="ops-mono">{run.run_id}</span>
              <span>{run.agent_name}</span>
              <span>{run.version}</span>
              <span>
                <span className={`badge ${run.status}`}>{run.status}</span>
              </span>
              <span>{run.score}</span>
              <span>{run.failure_category}</span>
              <span>{Math.round(run.confidence * 100)}%</span>
              <span>{run.recommendation}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="ops-card">
        <div className="section-header">
          <div>
            <p className="section-kicker">Latest view</p>
            <h2>Current v3 decision set</h2>
          </div>
          <span className="pill">Supports iterative release decisions</span>
        </div>
        <div className="ops-latest">
          {summary.latestVersionRuns.map((run) => (
            <article className="ops-latest-card" key={run.run_id}>
              <div className="section-header">
                <strong>{run.agent_name}</strong>
                <span className={`badge ${run.status}`}>{run.status}</span>
              </div>
              <p className="ops-latest-copy">{run.input}</p>
              <p className="ops-latest-copy subtle">{run.output}</p>
              <div className="ops-latest-meta">
                <span>{run.failure_category}</span>
                <span>{run.recommendation}</span>
              </div>
            </article>
          ))}
        </div>
        <p className="ops-note">
          Total categories tracked: {failureCategories.join(", ")}.
        </p>
      </section>
    </main>
  );
}
