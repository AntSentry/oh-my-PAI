# FeedbackLoops — PAI Feedback Loops as First-Class Pack Resources

The user's correction is canonical: “feedbacks” here means **feedback loops in PAI**, not feedback from people. In OMP these loops must be explicit resources that can be triggered, audited, leased, and tested.

## FeedbackLoop interface

```ts
interface FeedbackLoop {
  id: string;
  trigger: EventPattern;
  reads: PaiUri[];
  writes: PaiUri[];
  effect: 'route' | 'learn' | 'verify' | 'secure' | 'observe' | 'improve';
  lazyResources: PaiUri[];
  stopCondition?: string;
}
```

## Required loops

| Loop | Trigger | Canonical resources | Effect | Kind |
|---|---|---|---|---|
| prompt-mode-tier | UserPromptSubmit | PromptGuard, RepeatDetection, PromptProcessing | MODE/TIER route + telemetry | route |
| isa-criteria-verification | Algorithm phase transition | ISA, ISCs, CheckCompleteness, Verification append | current→ideal delta closure | verify |
| tool-observability | PostToolUse * | ToolActivityTracker, Pulse, activity logs | tool ground truth visible in dashboards | observe |
| tool-failure-learning | Tool failure / non-zero command | ToolFailureTracker, FailureCapture, learning stores | failure becomes future routing signal | learn |
| per-isc-checkpoint | ISC [ ]→[x] | CheckpointPerISC, repo allowlist, sidecar state | durable rollback trail | verify |
| isa-sync | ISA frontmatter/content write | ISASync, work.json, kitty phase tab | single-source phase/progress state | observe |
| session-learning | SessionEnd | WorkCompletionLearning, SessionCleanup, RelationshipMemory, UpdateCounts, IntegrityCheck, KVSync | session output enters memory/state loops | learn |
| satisfaction-capture | UserPromptSubmit / response sentiment | SatisfactionCapture, reflection metrics | quality/satisfaction signal captured | learn |
| last-response-cache | Stop | LastResponseCache, RepeatDetection | duplicate/continuation behavior controlled | route |
| relationship-memory | SessionEnd | RelationshipMemory | relationship context updated lazily | learn |
| learning-router | Algorithm LEARN | Knowledge/rule/gotcha/state/business/identity/doctrine/hook/permission targets | candidate learnings routed deterministically | learn |
| security-pipeline | PreToolUse Read/Write/Edit/MultiEdit/Bash | SecurityPipeline, PromptGuard, ContainmentGuard, SecretScan | unsafe operations blocked before execution | secure |
| content-scanner | PostToolUse WebFetch/WebSearch/* | ContentScanner | prompt injection and risky content detected | secure |
| context-preservation | PreCompact / SessionStart | PreCompact, RestoreContext, LoadContext, KVSync | critical state survives compaction/startup | observe |
| algorithm-reflection | Algorithm LEARN E2+ | algorithm-reflections.jsonl, PAIUpgrade/MineReflections | run experience improves doctrine | improve |
| complaint-rating-patterns | ratings/complaints | LearningPatternSynthesis, feedback-like pattern mining | recurring defects become system changes | improve |
| doc-integrity | Stop / system file changes | DocIntegrity, DocCheck, ReferenceCheck | documentation matches changed system surfaces | verify |
| telos-summary-sync | PostToolUse Write/Edit | TelosSummarySync, GenerateTelosSummary | TELOS rollups regenerate after source edits | learn |
| cost-performance | tool/model usage | CostTracker, Performance/Pulse routes | runtime spend and latency become visible | observe |
| pulse-action-loop | Pulse checks/events | Pulse routes, notifications, hooks | system state produces user-visible action | observe |
| skill-usage-learning | Skill invocation | Skill gotchas/workflows, Learning Router | pack usage improves future routing | improve |
| advisor-cato-conflict | VERIFY commitment boundaries | Advisor, Cato, conflict surfacing | external audit corrects approach before completion | verify |
| optimize-loop | Optimize mode | measurement, mutation, keep/revert, learning | metric hill-climb closes by evidence | improve |
| ideate-loop | Ideate mode | consume/dream/daydream/contemplate/steal/mate/test/evolve/meta-learn | idea search improves across cycles | improve |
| interview-loop | Interview workflow answers | InterviewScan, TELOS/identity destinations | answers update future context | learn |

## Required pack URIs

- `pai://loop/prompt-mode-tier`
- `pai://loop/isa-criteria-verification`
- `pai://loop/tool-observability`
- `pai://loop/tool-failure-learning`
- `pai://loop/per-isc-checkpoint`
- `pai://loop/isa-sync`
- `pai://loop/session-learning`
- `pai://loop/satisfaction-capture`
- `pai://loop/last-response-cache`
- `pai://loop/relationship-memory`
- `pai://loop/learning-router`
- `pai://loop/security-pipeline`
- `pai://loop/content-scanner`
- `pai://loop/context-preservation`
- `pai://loop/algorithm-reflection`
- `pai://loop/complaint-rating-patterns`
- `pai://loop/doc-integrity`
- `pai://loop/telos-summary-sync`
- `pai://loop/cost-performance`
- `pai://loop/pulse-action-loop`
- `pai://loop/skill-usage-learning`
- `pai://loop/advisor-cato-conflict`
- `pai://loop/optimize-loop`
- `pai://loop/ideate-loop`
- `pai://loop/interview-loop`

## Non-negotiable behavior

- Loops are not comments in prompts. They are event handlers with state transitions.
- Loop writes are explicit and auditable.
- Learning loops default to SKIP unless routed by the Learning Router.
- Security loops run before dangerous tool execution.
- Verification loops block completion if evidence is missing.
- Optimize and Ideate are declared iterative loops with stop criteria, not unbounded recursion.
