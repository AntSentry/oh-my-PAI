# TriggerGraph — Recursive Lazy Materialization

## Principle

A trigger is allowed to trigger other triggers. This is necessary for a perfect analog because canonical PAI behavior is not flat. Algorithm invokes Skills; Skills invoke Tools; Council invokes Agents; Verify invokes Advisor and sometimes Cato; hooks emit learning, security, and observability events.

## Required trigger classes

| Trigger class | Canonical source | Lazy materialization | Recursive outputs |
|---|---|---|---|
| user_prompt | UserPromptSubmit hooks | PromptGuard, RepeatDetection, PromptProcessing, SatisfactionCapture | mode_classified, prompt_rejected, satisfaction_signal |
| slash_command | commands/*.md | command body and dispatcher | workflow_start, tool_call, agent_spawn |
| algorithm_phase | Algorithm v6.3.0 | exact phase doctrine only | check_request, skill_workflow_start, agent_spawn |
| skill_workflow | skills/*/Workflows/*.md | one workflow body | tool_call, agent_spawn, nested_workflow |
| agent_spawn | agents/*.md | one agent prompt | tool_call, agent_result |
| tool_call | PAI/TOOLS or skill tools | adapter implementation path, not source in context | tool_result, failure_signal |
| check_request | Algorithm checks/hooks | executable gate implementation | pass/fail, phase_blocked |
| feedback_loop | loop registry | loop definition and target writers | learning_write, route_adjustment |
| pulse_route | Pulse route registry | exact route metadata/body | UI state query, action event |
| session_event | SessionStart/Stop/End/PreCompact | exact hook chain | context_restore, learning_write, cleanup |

## Recursion guards

```ts
interface TriggerBudget {
  maxDepth: number;        // default 8; Algorithm E5 may raise intentionally
  maxEvents: number;       // prevents trigger storms
  deadlineMs?: number;
  allowedKinds?: PaiResourceKind[];
}
```

Rules:

1. Maintain ancestry for every emitted event.
2. Reject cycles unless the loop declares itself iterative, e.g. Optimize or Ideate.
3. Iterative loops require explicit stop criteria.
4. Checks may block phase transition.
5. A failed lazy load is a hard error unless resource is explicitly optional.
6. Every materialized body emits a lease record and an unload event.

## Canonical examples

### /Council

```text
slash_command('/Council')
  → load pai://command/Council-dispatcher       // tiny OMP command
  → emit workflow_start(pai://skill/Council/workflow/Debate)
  → load Council Debate workflow only
  → load CouncilMembers/RoundStructure/OutputFormat refs if referenced
  → emit tool_call(pai://skill/Agents/tool/ComposeAgent.ts) per member
  → emit agent_spawn(custom-council-member) per composed member
  → collect rounds
  → emit workflow_result
```

### Algorithm VERIFY

```text
phase_enter(VERIFY)
  → load pai://algorithm/6.3.0/phase/verify
  → run pai://check/live-probe
  → run pai://check/capability-invocation
  → run pai://check/thinking-floor
  → run pai://check/tier-completeness
  → if E4/E5 emit agent_spawn(pai://agent/Cato)
  → emit phase_enter(LEARN) only if all blockers pass
```

### Tool failure learning

```text
tool_result(nonzero)
  → emit feedback_loop(pai://loop/tool-failure-learning)
  → load FailureCapture adapter
  → write structured learning candidate
  → Learning Router decides if retained at LEARN
```
