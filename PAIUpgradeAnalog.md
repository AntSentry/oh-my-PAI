# PAIUpgrade Analog — OMP-Compliant Update Runtime

Generated: 2026-05-23T05:06:29.041Z

## Thesis

PAIUpgrade must work in Oh My Pi as a **perfect analog of canonical PAIUpgrade** without mutating OMP into PAI and without degrading either system. The upgrade command pulls from the official PAI GitHub repository, detects deltas, and integrates them through the PAIAnalog lazy runtime contract:

```text
official PAI repo → audited delta graph → compatibility planner → lazy pack manifest update → optional model-assisted integration → executable verification gates
```

It must not copy new PAI doctrine into OMP startup context. It must not blindly overlay PAI files into OMP internals. It must not flatten PAIUpgrade into a generic updater. It must preserve PAI's own Thread 0/1/2/3 workflow semantics while adapting outputs to OMP resource kinds, extension APIs, tool lifecycle, context leases, and pack manifests.

## Canonical PAIUpgrade behavior to preserve

PAIUpgrade is not merely “git pull PAI”. It is a four-thread upgrade intelligence workflow:

| Thread | Canonical purpose | OMP analog |
|---|---|---|
| Thread 0 | Prior-work audit: Algorithm, capabilities, hooks, settings, skills, recent ISAs, knowledge, feedback memory | Audit current OMP + PAIAnalog state, including manifests, leases, trigger graph, extension registrations, Control Center inventory, and prior compatibility decisions |
| Thread 1 | User context: TELOS, projects, recent work, PAI state | Read only configured user-context resources through lazy PAIAnalog resolvers; never force-load full TELOS into baseline context |
| Thread 2 | Source collection: Anthropic, YouTube, custom sources, GitHub trending | Same source collection, plus official PAI GitHub repo delta scan as the primary update source |
| Thread 3 | Internal reflections: algorithm-reflections.jsonl | Mine OMP/PAIAnalog run reflections, trigger failures, verification misses, and compatibility-decision logs |
| Synthesis | Assign Prior Status and emit deltas only | Assign Prior Status against both PAI canonical source and OMP analog implementation; produce applyable compatibility plans |

## New source: official PAI repo update stream

PAIUpgrade in OMP gets a dedicated source adapter:

```ts
interface PaiOfficialRepoSource {
  id: 'official-pai-github';
  repo: 'https://github.com/danielmiessler/Personal_AI_Infrastructure.git';
  trackedRelease: 'Releases/v5.0.0/.claude' | string;
  lastSeenRevision: string;
  fetchMode: 'shallow-clone' | 'git-fetch' | 'archive-download';
}
```

The adapter produces a typed delta graph, not raw files:

```ts
type PaiDeltaKind =
  | 'skill-added' | 'skill-modified' | 'skill-removed'
  | 'workflow-added' | 'workflow-modified' | 'workflow-removed'
  | 'agent-added' | 'agent-modified' | 'agent-removed'
  | 'tool-added' | 'tool-modified' | 'tool-removed'
  | 'hook-added' | 'hook-modified' | 'hook-removed'
  | 'algorithm-added' | 'algorithm-modified' | 'algorithm-latest-changed'
  | 'command-added' | 'command-modified' | 'command-removed'
  | 'setting-changed' | 'permission-changed' | 'route-added' | 'route-modified'
  | 'feedback-loop-added' | 'feedback-loop-modified'
  | 'doc-modified' | 'unknown-structure';

interface PaiRepoDelta {
  id: string;
  kind: PaiDeltaKind;
  oldPath?: string;
  newPath?: string;
  oldHash?: string;
  newHash?: string;
  summary: string;
  canonicalResourceUri?: string;
  analogResourceUri?: string;
  risk: 'low' | 'medium' | 'high' | 'critical';
}
```

## OMP compliance constraints

The design must respect current OMP architecture:

1. Extensions are imported at startup and may register handlers, tools, commands, renderers, shortcuts, and flags. Runtime actions happen only after initialization.
2. OMP extension events include session, prompt, context, agent, turn, tool, retry, compaction, command, and resource-discovery surfaces.
3. Tool execution goes through registered tools and extension wrappers; tool names must be globally unique.
4. Custom tools are schema-typed and execute with cancellation support.
5. Hook-style behavior should be implemented through OMP extensions unless a legacy hook adapter is explicitly required.
6. Startup must not load full PAI bodies. Extension load may register metadata indexes and tiny dispatchers only.
7. `resources_discover` exists but has limited runtime callsites; PAIAnalog should not depend on it exclusively until OMP wires it fully.
8. Any compatibility patch to OMP core must preserve OMP-native abstractions and tests.

## PAIUpgrade analog command model

Register commands as thin dispatchers:

| Command | Body loaded at startup? | Lazy runtime action |
|---|---:|---|
| `/PAIUpgrade` | No | dispatch `pai://skill/PAIUpgrade/workflow/Upgrade` |
| `/PAIUpgradeMineReflections` | No | dispatch `pai://skill/PAIUpgrade/workflow/MineReflections` |
| `/PAIUpgradeAlgorithm` | No | dispatch `pai://skill/PAIUpgrade/workflow/AlgorithmUpgrade` |
| `/PAIUpgradeResearch` | No | dispatch `pai://skill/PAIUpgrade/workflow/ResearchUpgrade` |
| `/PAIUpgradeFindSources` | No | dispatch `pai://skill/PAIUpgrade/workflow/FindSources` |
| `/PAIUpgradeOfficialRepo` | No | run official repo delta adapter, then normal PAIUpgrade synthesis |

The dispatcher only knows command name, workflow URI, and parameter schema. The canonical workflow markdown is leased only after invocation.

## Update pipeline

### 1. Fetch official PAI source

- Clone/fetch official PAI repo into an OMP-managed cache, e.g. `${PI_CODING_AGENT_DIR}/pai-analog/sources/official-pai`.
- Store last seen revision in OMP state, not inside the PAI source tree.
- Never overwrite installed analog files directly from the source checkout.

### 2. Generate fresh canonical inventory

Run the same inventory pass used for `PAIAnalog.manifest.json`:

- release dirs
- packs
- skills
- workflows
- tools
- agents
- commands
- hooks
- settings registrations
- docs
- TypeScript symbols
- Pulse/routes if present
- feedback-loop indicators

### 3. Diff inventory, not just text

Produce semantic deltas by resource URI. Examples:

- `pai://skill/Council/workflow/Debate` changed.
- `pai://agent/Forge` changed.
- `pai://algorithm/LATEST` changed from 6.3.0 to 6.4.0.
- `pai://hook/PromptProcessing.hook.ts` changed and maps to OMP input/turn classifier.
- A new PAI hook exists with no OMP event mapping.

### 4. Classify compatibility action

```ts
type CompatibilityAction =
  | 'manifest-only'        // metadata/body hash update; no OMP code change
  | 'lazy-body-update'     // canonical body changes, resolver path/hash update only
  | 'adapter-update'       // existing OMP adapter must change
  | 'new-adapter'          // new PAI kind needs new OMP adapter
  | 'trigger-graph-update' // new/changed trigger semantics
  | 'check-update'         // new/changed executable gate
  | 'state-migration'      // persisted state shape changes
  | 'manual-review'        // destructive/security/ambiguous
  | 'reject-incompatible'; // violates OMP or analog premise
```

### 5. Model-assisted integration planning

When the delta is not accounted for, PAIUpgrade may invoke a model-assisted compatibility planner. This is allowed and required for maximal analog behavior, but it must be fenced:

```ts
interface CompatibilityPlannerInput {
  delta: PaiRepoDelta;
  canonicalSnippet: string;
  currentAnalogMeta: PaiResourceMeta | null;
  ompConstraints: string[];
  analogPremise: string;
  availableAdapters: string[];
  requiredChecks: string[];
}

interface CompatibilityPlannerOutput {
  action: CompatibilityAction;
  rationale: string;
  filesToChange: string[];
  manifestChanges: unknown;
  adapterDesign?: string;
  triggerChanges?: unknown;
  checkChanges?: unknown;
  risk: 'low' | 'medium' | 'high' | 'critical';
  verificationPlan: string[];
}
```

Planner invariants:

- It cannot authorize eager context loading.
- It cannot bypass OMP extension/tool contracts.
- It cannot silently overwrite OMP core.
- It cannot mark destructive/security changes as auto-apply.
- It must map every recommendation to specific files/resources and tests.
- It must produce a reversible patch plan.

### 6. Apply via staged compatibility patches

Low-risk updates can be applied automatically:

- metadata hash changes
- new workflow body under lazy storage
- new agent body under lazy storage
- new skill metadata with no adapter changes
- new command dispatcher metadata

Medium/high-risk updates require an executable plan and verification:

- OMP extension changes
- trigger graph semantics
- checks/gates
- tool adapter changes
- permissions/security behavior
- state migrations

Critical-risk changes must surface to the user or a dedicated review workflow:

- destructive file operations
- credential/secret handling changes
- security-pipeline weakening
- eager context expansion
- OMP core architectural changes
- PAI doctrine changes that conflict with OMP safety guarantees

### 7. Verify analog parity and OMP health

Every PAIUpgrade run must verify:

- Inventory counts are internally consistent.
- Every canonical resource has an analog URI or explicit compatibility decision.
- Startup prompt does not contain newly added PAI bodies.
- Dispatcher commands load exact workflows on demand.
- New/changed checks run as executable gates.
- OMP extension tests still pass for touched surfaces.
- PAIUpgrade can re-run idempotently without duplicating resources.

## PAIUpgrade-specific feedback loops

| Loop | Trigger | Effect |
|---|---|---|
| official-repo-delta | PAIUpgrade fetch completes | canonical delta graph produced |
| compatibility-planning | unknown/changed resource kind | model planner creates adapter/check/trigger plan |
| manifest-reconciliation | accepted delta | manifest updated, hashes recorded |
| analog-parity-check | after apply | verifies every PAI resource has analog representation |
| no-eager-context-regression | after apply and startup | verifies PAI bodies are not in baseline prompt |
| compatibility-decision-memory | manual/rejected/deferred decisions | future PAIUpgrade Thread 0 sees prior status |
| update-idempotency | second run on same revision | no duplicate resources or repeated patch proposals |

## Prior Status must become two-dimensional

Canonical PAIUpgrade uses Prior Status to avoid recommending already-done work. OMP analog needs two axes:

| Axis | Values | Meaning |
|---|---|---|
| PAI Canonical Status | NEW, PARTIAL, DISCUSSED, REJECTED, DONE | Whether official PAI already has/handled the technique |
| OMP Analog Status | UNREPRESENTED, METADATA_ONLY, LAZY_BODY, ADAPTERED, EXECUTABLE, VERIFIED, REJECTED_INCOMPATIBLE | How far the analog implementation has carried it |

A recommendation is only actionable if it has both statuses and evidence.

## What happens when official PAI adds something new

| New PAI thing | Analog update | Auto-apply? |
|---|---|---:|
| New skill | Add skill metadata, workflows, lazy body refs | Yes if structure valid |
| New workflow | Add workflow resource under skill | Yes if no new execution kind |
| New agent | Add Agent Control Center metadata and lazy prompt | Yes |
| New slash command | Add command dispatcher metadata | Yes if maps to known workflow/tool |
| New skill tool | Add lazy tool resource; create adapter only if invoked | Metadata yes; adapter maybe |
| New hook | Map to OMP event; if no event exists, propose extension/event addition | No unless direct mapping exists |
| New Algorithm phase/check | Add phase/check metadata; implement gate if required | No for behavior change |
| New feedback loop | Add loop metadata; implement event binding if event exists | No for new writers/security |
| New Pulse route | Add route metadata/control-center entry | Yes for metadata, no for UI behavior |
| New settings/permissions | Produce compatibility decision | No |
| New unknown structure | Model-assisted planning | No direct apply |

## File layout for OMP implementation

Recommended OMP-side files:

```text
packages/coding-agent/src/pai-analog/
  manifest.ts
  types.ts
  resolver.ts
  trigger-dispatcher.ts
  context-lease.ts
  checks.ts
  feedback-loops.ts
  official-repo-source.ts
  compatibility-planner.ts
  upgrade-runtime.ts
  extension.ts
  commands.ts
  tools.ts
  state.ts
  __tests__/
    manifest-counts.test.ts
    no-eager-context.test.ts
    paiupgrade-delta.test.ts
    trigger-recursion.test.ts
    compatibility-planner.test.ts
```

The extension entry registers tiny OMP-compliant surfaces:

```ts
export default function paiAnalogExtension(pi: ExtensionAPI) {
  pi.setLabel('PAI Analog');

  registerPaiAnalogCommands(pi);      // dispatchers only
  registerPaiAnalogTools(pi);         // schema wrappers only
  registerPaiAnalogEventHandlers(pi); // event → TriggerDispatcher
}
```

No workflow, agent, Algorithm, or tool body is imported in `extension.ts`.

## Tool surfaces

Register tools with names that cannot collide with OMP built-ins:

| Tool | Purpose |
|---|---|
| `pai_resolve_resource` | Load exact PAIAnalog URI under a context lease |
| `pai_dispatch_trigger` | Emit a recursive trigger event |
| `pai_run_check` | Run a named executable gate |
| `pai_upgrade_official_repo` | Fetch official repo, diff, plan, optionally apply |
| `pai_apply_compat_patch` | Apply staged compatibility patch after checks |
| `pai_analog_status` | Report manifest, leases, deltas, and parity status |

## Upgrade modes

| Mode | Behavior |
|---|---|
| report | Fetch, diff, plan, do not write |
| metadata | Apply manifest/lazy body hash changes only |
| safe-apply | Apply low-risk changes and run checks |
| plan-adapter | Use model planner for unaccounted deltas, write plan only |
| full | Apply safe changes, produce patches for risky changes, ask/resolve before risky apply |

Default should be `report` or `safe-apply` depending on command spelling. Destructive changes are never automatic.

## PAIUpgrade output in OMP

Keep canonical PAIUpgrade report sections, but add analog-specific columns:

1. Discoveries
2. Recommendations
3. Technique Details
4. Analog Compatibility Plan
5. Internal Reflections
6. Summary
7. Skipped
8. Sources Processed
9. State Written

Required recommendation columns:

- Priority
- Technique
- PAI Relevance
- OMP Analog Relevance
- PAI Canonical Status + evidence
- OMP Analog Status + evidence
- Compatibility Action
- Files/resources affected
- Verification plan

## Failure policy

Fail closed when:

- official repo cannot be authenticated/fetched and no cached revision exists;
- inventory generator cannot classify changed files;
- a delta would require eager PAI context loading;
- a hook/security/permission update cannot be mapped safely;
- model planner output lacks file/resource-specific plan;
- verification cannot prove no startup context regression;
- rerun is non-idempotent.

Proceed with warnings when:

- external sources beyond official PAI fail;
- user context is unavailable;
- reflections are missing;
- a low-risk body hash changes but no adapter behavior changes.

## Non-degradation guarantees

### OMP is protected because

- PAI is represented as pack resources, not global prompt bloat.
- OMP extension APIs remain the integration boundary.
- Tool names are prefixed and schema-typed.
- Core changes require compatibility plans and tests.
- Startup prompt regression is tested.

### PAI is protected because

- Official source remains canonical and revision-pinned.
- PAIUpgrade workflow semantics are preserved.
- PAI resources are not rewritten to fit OMP; adapters map them.
- Unknown new PAI structures are escalated to model-assisted compatibility planning instead of discarded.
- Prior Status prevents redundant or rejected ideas from resurfacing.

## Acceptance criteria

1. Running PAIUpgrade in OMP fetches/checks official PAI repo revision.
2. It inventories every changed PAI surface by URI.
3. It preserves PAIUpgrade Thread 0/1/2/3 synthesis semantics.
4. It assigns both PAI Canonical Status and OMP Analog Status.
5. It applies safe manifest/lazy-body updates without eager context loading.
6. It plans unknown deltas using a fenced model planner.
7. It refuses changes that degrade OMP extension/tool contracts.
8. It refuses changes that degrade PAI doctrine/workflow fidelity.
9. It verifies startup prompt has no PAI body regression.
10. It verifies all newly added resources are addressable and lazy-loadable.
11. It is idempotent on second run against the same revision.
12. It writes compatibility decisions so future Thread 0 can see them.
