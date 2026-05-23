# Architecture — Lazy Recursive PAI Runtime for OMP

## Core decision

Do not port PAI as a giant prompt, global extension, or eager skill registry. Port it as a pack runtime with six primitives:

1. **PackIndex** — metadata-only index.
2. **ResourceResolver** — loads exact content by URI only when needed.
3. **TriggerDispatcher** — recursive, bounded event-to-resource executor.
4. **ContextLease** — scoped materialization and deterministic unloading.
5. **CheckRuntime** — executable gates for doctrine, verification, security, and completeness.
6. **AnalogState** — event log, phase state, resource leases, evidence, and learning outputs.

## Resource URI model

```text
pai://algorithm/6.3.0/phase/observe
pai://algorithm/6.3.0/check/thinking-floor
pai://skill/Council/workflow/Debate
pai://agent/Forge
pai://tool/Inference.ts
pai://hook/PromptProcessing.hook.ts
pai://loop/isa-criteria-verification
pai://route/Pulse/Agents
pai://command/cs
```

Each URI has an eager record and a lazy body.

### Eager metadata

```ts
interface PaiResourceMeta {
  uri: PaiUri;
  kind: 'algorithm' | 'phase' | 'skill' | 'workflow' | 'agent' | 'tool' | 'hook' | 'check' | 'loop' | 'route' | 'command' | 'doc';
  name: string;
  description?: string;
  triggers: TriggerPattern[];
  dependencies: PaiUri[];
  materializes: PaiUri[];
  sourcePath: string;
  sourceRevision: string;
  hash: string;
}

interface PaiResourceBody {
  meta: PaiResourceMeta;
  content: string | Uint8Array;
  parsed?: unknown;
}
```

### Lazy body rule

OMP may display metadata and route by metadata. OMP may not include resource body content in model context until a trigger dispatch explicitly leases it.

## Trigger runtime

```ts
interface TriggerEvent {
  id: string;
  type: 'user_prompt' | 'slash_command' | 'tool_call' | 'tool_result' | 'phase_enter' | 'check_request' | 'agent_spawn' | 'workflow_start' | 'session_start' | 'session_end' | 'compact' | 'pulse_route';
  payload: unknown;
  ancestry: string[];
  budget: TriggerBudget;
}

interface TriggerAction {
  load?: PaiUri[];
  run?: PaiUri[];
  emit?: TriggerEvent[];
  check?: PaiUri[];
  writeEvidence?: EvidenceRecord[];
}
```

Trigger recursion is required for parity. Example:

```text
user_prompt
  → pai://hook/PromptProcessing.hook.ts
  → emits mode_classified(ALGORITHM,E4)
  → pai://algorithm/6.3.0/phase/observe
  → loads pai://skill/ISA/workflow/Scaffold
  → emits phase_enter(think)
  → loads selected thinking capabilities
  → /Council command
  → pai://skill/Council/workflow/Debate
  → loads pai://skill/Agents/tool/ComposeAgent.ts
  → emits agent_spawn(custom-member)
  → loads only that member prompt
```

## Context leases

```ts
interface ContextLease {
  id: string;
  uri: PaiUri;
  reason: string;
  phase?: AlgorithmPhase;
  ownerEventId: string;
  expiresOn: 'phase_exit' | 'tool_result' | 'workflow_end' | 'session_end';
  tokenEstimate: number;
}
```

Rules:

- Algorithm phase doctrine expires at phase exit.
- Workflow body expires at workflow end.
- Agent prompt expires after agent spawn.
- Tool source does not enter model context unless being edited or audited; execution uses adapter path.
- Check definitions may stay loaded only while their gate is running.

## OMP integration points

1. **Discovery**: add PAI pack source as metadata provider.
2. **Slash commands**: add dispatcher commands only; body is lazy.
3. **Tools**: register small wrapper tools that call ResourceResolver.
4. **Agents**: Agent Control Center shows summary records; full prompt loads only on spawn.
5. **System prompt**: include only the presence of the PAIAnalog runtime and compact routing rules, not PAI bodies.
6. **Hooks/events**: map OMP events to TriggerDispatcher inputs.
7. **Checks**: expose executable checks as OMP gates.
8. **Pulse/Control Center**: routes query metadata/state; route bodies lazy.

## Surfaces that must not be eager-loaded

- Algorithm markdown bodies.
- Skill `SKILL.md` full text.
- Workflow files.
- Agent prompts.
- Tool TypeScript source.
- Hook TypeScript source.
- Pulse route implementation.
- Large docs and references.

Only metadata is eager. Maximal capability, minimal context residency.
