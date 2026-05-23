# ImplementationPlan — Bit-by-Bit OMP Port

## Phase 0 — Source of truth

1. Keep `PAIAnalog.manifest.json` as generated metadata.
2. Keep `pai-latest-audit-inventory.json` as audit evidence.
3. Add a generator later: `bun tools/generate-pai-analog-manifest.ts --source <clone>`.
4. Tests assert audited counts: 45 skills, 171 workflows, 18 agents, 3 commands, 68 hook/support files, 72 tools.

## Phase 1 — Pack metadata capability

Add an OMP capability that discovers pack manifests without loading bodies.

```ts
interface PackManifest {
  id: string;
  version: string;
  sourceRevision: string;
  resources: PaiResourceMeta[];
  triggers: TriggerMeta[];
  feedbackLoops: FeedbackLoopMeta[];
  checks: CheckMeta[];
}
```

Acceptance:

- Agent Control Center can list PAI agents from metadata only.
- Skill/Pack Control Center can list all skills/workflows from metadata only.
- Startup prompt token count does not grow with PAI body size.

## Phase 2 — Lazy ResourceResolver

Implement `resolvePaiResource(uri)` with integrity checking.

Acceptance:

- Resolving `pai://skill/Council/workflow/Debate` loads only that workflow.
- Resolving `pai://agent/Forge` loads only Forge prompt.
- Resolving `pai://algorithm/6.3.0/phase/verify` loads only VERIFY doctrine slice.

## Phase 3 — Recursive TriggerDispatcher

Implement event dispatch with ancestry, budgets, cycle guards, and declared iterative loops.

Acceptance:

- Slash command can emit workflow_start.
- Workflow can emit tool_call and agent_spawn.
- Agent spawn can load one prompt lazily.
- Optimize/Ideate can iterate only with stop criteria.

## Phase 4 — PAI Effort system

Port PromptProcessing as an OMP classifier hook/trigger.

Acceptance:

- Every top-level prompt produces MODE.
- ALGORITHM prompts produce E1-E5.
- Explicit /e1-/e5 overrides classifier.
- Classifier failures fail safe to ALGORITHM E3.

## Phase 5 — Algorithm state machine

Represent Algorithm phases as state and phase-scoped lazy doctrine.

Acceptance:

- OBSERVE, THINK, PLAN, BUILD, EXECUTE, VERIFY, LEARN transitions are explicit.
- Phase transition emits event.
- Phase doctrine lease expires on phase exit.
- Checks block transition.

## Phase 6 — ISA runtime

Port ISA as system-of-record, not an auxiliary artifact.

Acceptance:

- Project/task ISA home selected correctly.
- ISA workflows lazy-load.
- Criteria map to checks.
- Verification evidence is attached before [x].

## Phase 7 — Agents and Council

Wire Agent Control Center to metadata summaries and lazy prompt loading.

Acceptance:

- All 18 PAI agents visible.
- No agent prompt body appears until spawn.
- /Council loads Debate or Quick workflow only when invoked.
- Council can trigger ComposeAgent and spawn custom members recursively.

## Phase 8 — Tools and hooks

Represent hooks/tools as lazy executable adapters.

Acceptance:

- Hook metadata subscribes to OMP events.
- Tool adapters execute by path without model-context source loading.
- Source loads only when editing/auditing a tool.

## Phase 9 — Feedback loops

Install feedback loops as `pai://loop/*` resources.

Acceptance:

- Tool failure emits tool-failure-learning.
- SessionEnd emits session-learning.
- Algorithm LEARN emits learning-router and algorithm-reflection.
- Security/content loops run at pre/post tool boundaries.

## Phase 10 — Pulse and control centers

Add Control Center views backed by metadata and state.

Acceptance:

- Agents, Skills, Tools, Hooks, Checks, Loops, Routes visible.
- Clicking/invoking a body creates a lease.
- Route pages do not force-load unrelated pack bodies.

## Final acceptance

- No startup PAI body loading.
- Exact audited inventory represented.
- Recursive triggers work.
- Effort system works.
- Algorithm gates block correctly.
- Feedback loops are executable.
- Tests fail on count drift.
- The analog is maximal in capability and minimal only in context residency.
