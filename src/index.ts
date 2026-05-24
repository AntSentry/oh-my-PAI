export type ResourceKind =
  | "agent"
  | "algorithm"
  | "check"
  | "command"
  | "hook"
  | "skill"
  | "skill-tool"
  | "tool"
  | "workflow";

export interface PaiResourceMeta {
  uri: string;
  kind: ResourceKind;
  name: string;
  pack: string;
  summary: string;
  sourcePath: string;
  integrity: string;
}

export interface ManifestTotals {
  packs: number;
  skills: number;
  workflows: number;
  agents: number;
  commands: number;
  hooks: number;
  skillTools: number;
  tools: number;
}

export interface TriggerMeta {
  id: string;
  event: string;
  pattern: string;
  emits: string[];
}

export interface CheckMeta {
  id: string;
  resourceUri: string;
  description: string;
}

export interface FeedbackLoopMeta {
  id: string;
  event: string;
  resourceUri: string;
}

export interface PackManifest {
  id: string;
  version: string;
  sourceRevision: string;
  totals: ManifestTotals;
  resources: PaiResourceMeta[];
  triggers: TriggerMeta[];
  checks: CheckMeta[];
  feedbackLoops: FeedbackLoopMeta[];
}

export interface ManifestIndex {
  get(uri: string): PaiResourceMeta | undefined;
  list(kind?: ResourceKind): PaiResourceMeta[];
  validateTotals(): string[];
}

export interface ResourceReader {
  read(path: string): Promise<string>;
  hash(body: string): string;
}

export interface ResolvedResource extends PaiResourceMeta {
  body: string;
}

export interface ResourceResolver {
  resolve(uri: string): Promise<ResolvedResource>;
}

export interface TriggerEvent {
  event: string;
  value: string;
}

export interface TriggerEmission {
  depth: number;
  triggerId: string;
  uri: string;
}

export interface TriggerDispatcher {
  dispatch(event: TriggerEvent): TriggerEmission[];
}

export interface IterativeLoopState {
  iteration: number;
  stopped: boolean;
}

export interface IterativeLoopController {
  next(): IterativeLoopState;
}

export type PaiMode = "ALGORITHM" | "MINIMAL" | "NATIVE";
export type Effort = "E1" | "E2" | "E3" | "E4" | "E5";

export interface EffortClassification {
  mode: PaiMode;
  effort?: Effort;
  reason: string;
}

export type CheckContext = Record<string, unknown>;

export interface CheckResult {
  uri: string;
  passed: boolean;
  evidence: string;
}

export type CheckHandler = (context: CheckContext) => Promise<Omit<CheckResult, "uri">>;

export interface CheckRunner {
  run(uri: string, context: CheckContext): Promise<CheckResult>;
}

export type AlgorithmPhase =
  | "OBSERVE"
  | "THINK"
  | "PLAN"
  | "BUILD"
  | "EXECUTE"
  | "VERIFY"
  | "LEARN";

const algorithmPhases: AlgorithmPhase[] = [
  "OBSERVE",
  "THINK",
  "PLAN",
  "BUILD",
  "EXECUTE",
  "VERIFY",
  "LEARN"
];

export interface ContextLease {
  uri: string;
  phase: AlgorithmPhase;
  active: boolean;
}

export interface PhaseTransition {
  from: AlgorithmPhase;
  to: AlgorithmPhase;
  lease: ContextLease;
  checks: CheckResult[];
}

export interface AlgorithmStateMachine {
  current(): AlgorithmPhase;
  leases(): ContextLease[];
  transition(to: AlgorithmPhase, context: CheckContext): Promise<PhaseTransition>;
}

export type IsaScope = "project" | "task";

export interface VerificationEvidence {
  command: string;
  output: string;
  passed: boolean;
}

export interface IsaCriterion {
  id: string;
  text: string;
  checkUri: string;
  status: "complete" | "open";
  evidence?: VerificationEvidence;
}

export interface IsaRecord {
  home: string;
  addCriterion(criterion: Omit<IsaCriterion, "status">): void;
  attachEvidence(id: string, evidence: VerificationEvidence): void;
  complete(id: string): IsaCriterion;
  criteria(): IsaCriterion[];
}

export type RuntimePayload = Record<string, unknown>;

export interface FeedbackLoopResult {
  loopId: string;
  handled: boolean;
}

export type FeedbackLoopHandler = (payload: RuntimePayload) => Promise<FeedbackLoopResult>;

export interface FeedbackLoopRuntime {
  emit(event: string, payload: RuntimePayload): Promise<FeedbackLoopResult[]>;
}

export interface AdapterResult {
  adapterUri: string;
  output: string;
}

export type AdapterHandler = (payload: RuntimePayload) => Promise<AdapterResult>;

export interface AdapterRegistry {
  run(uri: string, payload: RuntimePayload): Promise<AdapterResult>;
}

export interface HookSubscription {
  event: string;
  hookUri: string;
  sourcePath: string;
}

export interface ControlCenterItem {
  name: string;
  uri: string;
}

export interface ControlCenterCheckItem {
  id: string;
  uri: string;
}

export interface ControlCenterLoopItem {
  event: string;
  id: string;
  uri: string;
}

export interface ControlCenterRouteItem {
  event: string;
  id: string;
  pattern: string;
  emits: string[];
}

export interface ControlCenterSnapshot {
  agents: ControlCenterItem[];
  checks: ControlCenterCheckItem[];
  commands: ControlCenterItem[];
  feedbackLoops: ControlCenterLoopItem[];
  hooks: ControlCenterItem[];
  routes: ControlCenterRouteItem[];
  skills: ControlCenterItem[];
  tools: ControlCenterItem[];
  workflows: ControlCenterItem[];
}

export interface RuntimeLease {
  uri: string;
  active: boolean;
  reason: string;
}

export interface RuntimeOrchestrationResult {
  classification: EffortClassification;
  emissions: TriggerEmission[];
  resources: ResolvedResource[];
  leases: RuntimeLease[];
}

export interface RuntimeOrchestrator {
  handlePrompt(prompt: string): Promise<RuntimeOrchestrationResult>;
  invokeResource(uri: string, reason?: string): Promise<ResolvedResource>;
  leases(): RuntimeLease[];
  releaseAll(): void;
}

export type ParitySurface =
  | "agents"
  | "algorithm"
  | "checks"
  | "commands"
  | "effortLevels"
  | "feedbackLoops"
  | "functions"
  | "hooks"
  | "promptPrepend"
  | "skillTools"
  | "skills"
  | "tools"
  | "workflows";

export type ParityStatus = "covered" | "missing" | "partial";

export interface ParityMatrixRow {
  surface: ParitySurface;
  expected: number;
  represented: number;
  status: ParityStatus;
  missingSamples: string[];
}

export interface ParityGap {
  surface: ParitySurface;
  severity: "critical" | "high";
  expected: number;
  represented: number;
  missingSamples: string[];
}

export interface PromptPrependMapping {
  target: string;
  prepended: string;
  sourcePath: string;
}

export interface ParityReport {
  sourceRevision: string;
  generatedAt: string;
  matrix: ParityMatrixRow[];
  gaps: ParityGap[];
  promptPrependMap: PromptPrependMapping[];
}

type GeneratedManifest = {
  id?: unknown;
  version?: unknown;
  source?: { head?: unknown };
  totals?: Record<string, unknown>;
  resources?: {
    packs?: GeneratedPack[];
    skills?: GeneratedPack[];
    agents?: GeneratedNamedPath[];
    commands?: GeneratedNamedPath[];
    hooks?: GeneratedNamedPath[];
    tools?: GeneratedNamedPath[];
    algorithm?: GeneratedNamedPath[];
    feedbackLoops?: GeneratedFeedbackLoop[];
    functions?: GeneratedFunctionEntry[];
  };
};

type GeneratedPack = {
  name?: unknown;
  desc?: unknown;
  uri?: unknown;
  workflows?: unknown[];
  tools?: unknown[];
};

type GeneratedNamedPath = {
  name?: unknown;
  path?: unknown;
  uri?: unknown;
};

type GeneratedFeedbackLoop = {
  id?: unknown;
  trigger?: unknown;
  uri?: unknown;
};

type GeneratedCheck = {
  id?: unknown;
  uri?: unknown;
  description?: unknown;
};

type GeneratedFunctionEntry = {
  file?: unknown;
  symbols?: unknown;
};

const countByKind: Record<keyof ManifestTotals, ResourceKind> = {
  agents: "agent",
  commands: "command",
  hooks: "hook",
  packs: "skill",
  skillTools: "skill-tool",
  skills: "skill",
  tools: "tool",
  workflows: "workflow"
};

export function loadManifest(input: unknown): PackManifest {
  const generated = input as GeneratedManifest;
  if (typeof generated.id !== "string") {
    throw new Error("Invalid manifest id");
  }

  const packs = generated.resources?.skills ?? generated.resources?.packs ?? [];
  const agents = generated.resources?.agents ?? [];
  const commands = generated.resources?.commands ?? [];
  const hooks = generated.resources?.hooks ?? [];
  const tools = generated.resources?.tools ?? [];
  const algorithm = generated.resources?.algorithm ?? [];
  const feedbackLoops = generated.resources?.feedbackLoops ?? [];
  const checks = Array.isArray((generated as { checks?: unknown }).checks)
    ? ((generated as { checks: GeneratedCheck[] }).checks)
    : [];

  return {
    id: generated.id,
    version: asString(generated.version, "0.0.0"),
    sourceRevision: asString(generated.source?.head, "unknown"),
    totals: {
      packs: asNumber(generated.totals?.packs),
      skills: asNumber(generated.totals?.v5Skills),
      workflows: asNumber(generated.totals?.v5Workflows),
      agents: asNumber(generated.totals?.v5Agents),
      commands: asNumber(generated.totals?.v5Commands),
      hooks: asNumber(generated.totals?.v5Hooks),
      skillTools: asNumber(generated.totals?.v5SkillTools),
      tools: asNumber(generated.totals?.v5PaiTools)
    },
    resources: uniquifyResourceUris([
      ...packs.flatMap(normalizePack),
      ...agents.map((agent) => normalizeNamedPath(agent, "agent")),
      ...commands.map((command) => normalizeNamedPath(command, "command")),
      ...hooks.map((hook) => normalizeNamedPath(hook, "hook")),
      ...tools.map((tool) => normalizeNamedPath(tool, "tool")),
      ...algorithm.flatMap(normalizeAlgorithmEntry)
    ]),
    triggers: [],
    checks: checks.map(normalizeCheck),
    feedbackLoops: feedbackLoops.map(normalizeFeedbackLoop)
  };
}

export function createManifestIndex(manifest: PackManifest): ManifestIndex {
  const resources = [...manifest.resources];
  const byUri = new Map<string, PaiResourceMeta>();
  for (const resource of resources) {
    if (byUri.has(resource.uri)) {
      throw new Error(`Duplicate resource URI: ${resource.uri}`);
    }
    byUri.set(resource.uri, resource);
  }

  return {
    get(uri) {
      return byUri.get(uri);
    },
    list(kind) {
      return resources.filter((resource) => kind === undefined || resource.kind === kind);
    },
    validateTotals() {
      return (Object.keys(countByKind) as (keyof ManifestTotals)[]).flatMap((totalKey) => {
        if (totalKey === "packs") {
          return [];
        }
        const kind = countByKind[totalKey];
        const actual = resources.filter((resource) => resource.kind === kind).length;
        const expected = manifest.totals[totalKey];
        return actual === expected
          ? []
          : [`Expected ${expected} ${kind} resources, found ${actual}`];
      });
    }
  };
}

export function createResourceResolver(
  index: ManifestIndex,
  reader: ResourceReader
): ResourceResolver {
  return {
    async resolve(uri) {
      const resource = index.get(uri);
      if (resource === undefined) {
        throw new Error(`Unknown resource: ${uri}`);
      }
      const body = await readResourceBody(resource.sourcePath, reader);
      const actualIntegrity = reader.hash(body);
      if (actualIntegrity !== resource.integrity) {
        throw new Error(`Integrity mismatch for ${uri}`);
      }
      return { ...resource, body };
    }
  };
}

async function readResourceBody(sourcePath: string, reader: ResourceReader): Promise<string> {
  const [path, fragment] = sourcePath.split("#", 2);
  const body = await reader.read(path);
  if (fragment?.startsWith("phase=") !== true) {
    return body;
  }
  return extractAlgorithmPhase(body, fragment.slice("phase=".length));
}

export function createTriggerDispatcher(
  triggers: TriggerMeta[],
  options: { maxDepth: number; maxEmits: number }
): TriggerDispatcher {
  return {
    dispatch(event) {
      const emissions: TriggerEmission[] = [];
      const seen = new Set<string>();
      const visit = (current: TriggerEvent, depth: number): void => {
        if (depth > options.maxDepth) {
          return;
        }
        for (const trigger of triggers) {
          if (trigger.event === current.event && trigger.pattern === current.value) {
            for (const uri of trigger.emits) {
              if (emissions.length >= options.maxEmits) {
                throw new Error("Trigger emission budget exceeded");
              }
              const ancestryKey = `${trigger.id}:${uri}`;
              if (!seen.has(ancestryKey)) {
                seen.add(ancestryKey);
                emissions.push({ depth, triggerId: trigger.id, uri });
                visit({ event: "resource", value: uri }, depth + 1);
              }
            }
          }
        }
      };
      visit(event, 0);
      return emissions;
    }
  };
}

export function createIterativeLoopController(options: {
  maxIterations: number;
  shouldStop(iteration: number): boolean;
}): IterativeLoopController {
  let iteration = 0;
  let stopped = false;

  return {
    next() {
      if (stopped || iteration >= options.maxIterations || options.shouldStop(iteration)) {
        stopped = true;
        return { iteration, stopped };
      }
      iteration += 1;
      return { iteration, stopped: false };
    }
  };
}

export function classifyEffort(prompt: string): EffortClassification {
  const trimmed = prompt.trim();
  const override = /^\/e([1-5])\b/i.exec(trimmed);
  if (override?.[1] !== undefined) {
    const effort = `E${override[1]}` as Effort;
    return {
      mode: effort === "E1" ? "NATIVE" : "ALGORITHM",
      effort,
      reason: "explicit override"
    };
  }

  if (/^(thanks|thank you|ok|okay|yes|no)\.?$/i.test(trimmed)) {
    return { mode: "MINIMAL", reason: "acknowledgment" };
  }

  if (/^(what time is it\??|date\??|pwd|ls)$/i.test(trimmed)) {
    return { mode: "NATIVE", effort: "E1", reason: "single-step quick task" };
  }

  return {
    mode: "ALGORITHM",
    effort: "E3",
    reason: "multi-step implementation or investigation"
  };
}

export function createSafeEffortClassifier(
  classify: (prompt: string) => EffortClassification
): (prompt: string) => EffortClassification {
  return (prompt) => {
    try {
      return classify(prompt);
    } catch (error) {
      return {
        mode: "ALGORITHM",
        effort: "E3",
        reason: `classifier failed: ${errorMessage(error)}`
      };
    }
  };
}

export function createCheckRunner(handlers: Record<string, CheckHandler>): CheckRunner {
  return {
    async run(uri, context) {
      const handler = handlers[uri];
      if (handler === undefined) {
        throw new Error(`No executable check registered for ${uri}`);
      }
      const result = await handler(context);
      return { uri, ...result };
    }
  };
}

export function createAlgorithmStateMachine(options: {
  initialPhase: AlgorithmPhase;
  checkRunner: CheckRunner;
  phaseChecks: Partial<Record<AlgorithmPhase, string[]>>;
  onTransition?: (transition: PhaseTransition) => void;
}): AlgorithmStateMachine {
  let phase = options.initialPhase;
  const activeLeases: ContextLease[] = [];

  return {
    current() {
      return phase;
    },
    leases() {
      return activeLeases.map((lease) => ({ ...lease }));
    },
    async transition(to, context) {
      const requiredChecks = options.phaseChecks[to] ?? [];
      const checks = [];
      for (const checkUri of requiredChecks) {
        const result = await options.checkRunner.run(checkUri, context);
        checks.push(result);
      }
      const failed = checks.find((check) => !check.passed);
      if (failed !== undefined) {
        throw new Error(`Blocked phase transition to ${to}: ${failed.uri}`);
      }

      for (const lease of activeLeases) {
        lease.active = false;
      }
      const lease = {
        uri: algorithmPhaseUri(to),
        phase: to,
        active: true
      };
      activeLeases.push(lease);
      const from = phase;
      phase = to;
      const transition = { from, to, lease: { ...lease }, checks };
      options.onTransition?.(transition);
      return transition;
    }
  };
}

export function createIsaRecord(options: { scope: IsaScope; id: string }): IsaRecord {
  const criteriaById = new Map<string, IsaCriterion>();

  return {
    home: `pai://isa/${options.scope}/${options.id}`,
    addCriterion(criterion) {
      if (criteriaById.has(criterion.id)) {
        throw new Error(`Duplicate criterion: ${criterion.id}`);
      }
      criteriaById.set(criterion.id, { ...criterion, status: "open" });
    },
    attachEvidence(id, evidence) {
      const criterion = criteriaById.get(id);
      if (criterion === undefined) {
        throw new Error(`Unknown criterion: ${id}`);
      }
      criterion.evidence = evidence;
    },
    complete(id) {
      const criterion = criteriaById.get(id);
      if (criterion === undefined) {
        throw new Error(`Unknown criterion: ${id}`);
      }
      if (criterion.evidence === undefined) {
        throw new Error(`Verification evidence required for ${id}`);
      }
      criterion.status = "complete";
      return copyCriterion(criterion);
    },
    criteria() {
      return [...criteriaById.values()].map(copyCriterion);
    }
  };
}

export function createFeedbackLoopRuntime(
  loops: FeedbackLoopMeta[],
  handlers: Record<string, FeedbackLoopHandler>
): FeedbackLoopRuntime {
  return {
    async emit(event, payload) {
      const matchingLoops = loops.filter((loop) => loop.event === event);
      const results = [];
      for (const loop of matchingLoops) {
        const handler = handlers[loop.resourceUri];
        if (handler === undefined) {
          throw new Error(`No executable feedback loop registered for ${loop.resourceUri}`);
        }
        results.push(await handler(payload));
      }
      return results;
    }
  };
}

export function createAdapterRegistry(handlers: Record<string, AdapterHandler>): AdapterRegistry {
  return {
    async run(uri, payload) {
      const handler = handlers[uri];
      if (handler === undefined) {
        throw new Error(`No executable adapter registered for ${uri}`);
      }
      return handler(payload);
    }
  };
}

export function createManifestAdapterRegistry(
  index: ManifestIndex,
  handlersByPath: Record<string, AdapterHandler>
): AdapterRegistry {
  return {
    async run(uri, payload) {
      const resource = index.get(uri);
      if (resource === undefined) {
        throw new Error(`Unknown adapter resource: ${uri}`);
      }
      const handler = handlersByPath[resource.sourcePath];
      if (handler === undefined) {
        throw new Error(`No executable adapter registered for ${resource.sourcePath}`);
      }
      return handler(payload);
    }
  };
}

export function createHookSubscriptionIndex(manifest: PackManifest): HookSubscription[] {
  return manifest.resources
    .filter((resource) => resource.kind === "hook")
    .map((hook) => ({
      event: hookEventName(hook.name),
      hookUri: hook.uri,
      sourcePath: hook.sourcePath
    }));
}

export function createControlCenterSnapshot(manifest: PackManifest): ControlCenterSnapshot {
  return {
    agents: itemsFor(manifest.resources, "agent"),
    checks: manifest.checks.map((check) => ({ id: check.id, uri: check.resourceUri })),
    commands: itemsFor(manifest.resources, "command"),
    feedbackLoops: manifest.feedbackLoops.map((loop) => ({
      event: loop.event,
      id: loop.id,
      uri: loop.resourceUri
    })),
    hooks: itemsFor(manifest.resources, "hook"),
    routes: manifest.triggers.map((trigger) => ({
      event: trigger.event,
      id: trigger.id,
      pattern: trigger.pattern,
      emits: [...trigger.emits]
    })),
    skills: itemsFor(manifest.resources, "skill"),
    tools: [
      ...itemsFor(manifest.resources, "tool"),
      ...itemsFor(manifest.resources, "skill-tool")
    ],
    workflows: itemsFor(manifest.resources, "workflow")
  };
}

export function createRuntimeOrchestrator(options: {
  classify(prompt: string): EffortClassification;
  dispatcher: TriggerDispatcher;
  resolver: ResourceResolver;
}): RuntimeOrchestrator {
  const leases: RuntimeLease[] = [];

  return {
    async handlePrompt(prompt) {
      const classification = options.classify(prompt);
      const emissions = options.dispatcher.dispatch({ event: "command", value: prompt });
      const resources = [];
      for (const emission of emissions) {
        resources.push(await options.resolver.resolve(emission.uri));
        leases.push({
          uri: emission.uri,
          active: true,
          reason: `trigger:${emission.triggerId}`
        });
      }
      return {
        classification,
        emissions,
        resources,
        leases: copyRuntimeLeases(leases)
      };
    },
    async invokeResource(uri, reason = "direct-invocation") {
      const resource = await options.resolver.resolve(uri);
      leases.push({
        uri,
        active: true,
        reason
      });
      return resource;
    },
    leases() {
      return copyRuntimeLeases(leases);
    },
    releaseAll() {
      for (const lease of leases) {
        lease.active = false;
      }
    }
  };
}

export function buildParityReport(options: {
  generatedManifest: unknown;
  manifest: PackManifest;
  generatedAt?: string;
}): ParityReport {
  const generated = options.generatedManifest as GeneratedManifest;
  const resources = generated.resources ?? {};
  const promptPrependMap = buildPromptPrependMap();
  const rows: ParityMatrixRow[] = [
    parityRow("skills", options.manifest.totals.skills, options.manifest.resources.filter((resource) => resource.kind === "skill").length, sampleNames(resources.skills)),
    parityRow("workflows", options.manifest.totals.workflows, options.manifest.resources.filter((resource) => resource.kind === "workflow").length, samplePackChildren(resources.skills, "workflows")),
    parityRow("skillTools", options.manifest.totals.skillTools, options.manifest.resources.filter((resource) => resource.kind === "skill-tool").length, samplePackChildren(resources.skills, "tools")),
    parityRow("agents", options.manifest.totals.agents, options.manifest.resources.filter((resource) => resource.kind === "agent").length, sampleNames(resources.agents)),
    parityRow("commands", options.manifest.totals.commands, options.manifest.resources.filter((resource) => resource.kind === "command").length, sampleNames(resources.commands)),
    parityRow("hooks", options.manifest.totals.hooks, options.manifest.resources.filter((resource) => resource.kind === "hook").length, sampleNames(resources.hooks)),
    parityRow("tools", options.manifest.totals.tools, options.manifest.resources.filter((resource) => resource.kind === "tool").length, sampleNames(resources.tools)),
    parityRow("algorithm", asNumber(generated.totals?.v5AlgorithmFiles) || arrayLength(resources.algorithm), arrayLength(resources.algorithm), sampleNames(resources.algorithm)),
    parityRow("functions", asNumber(generated.totals?.v5TsSymbolFiles), representedFunctionCount(resources.functions), sampleFunctionNames(resources.functions)),
    parityRow("feedbackLoops", arrayLength(resources.feedbackLoops), options.manifest.feedbackLoops.length, sampleLoopNames(resources.feedbackLoops)),
    parityRow("checks", arrayLength((generated as { checks?: unknown[] }).checks), options.manifest.checks.length, sampleCheckNames((generated as { checks?: GeneratedCheck[] }).checks)),
    parityRow("effortLevels", 5, representedEffortLevelCount(), ["E1", "E2", "E3", "E4", "E5"]),
    parityRow("promptPrepend", 5, promptPrependMap.length, promptPrependMap.map((entry) => entry.prepended))
  ];
  const gaps = rows
    .filter((row) => row.status !== "covered")
    .map((row): ParityGap => ({
      surface: row.surface,
      severity: row.status === "missing" ? "critical" : "high",
      expected: row.expected,
      represented: row.represented,
      missingSamples: row.missingSamples
    }));

  return {
    sourceRevision: asString(generated.source?.head, options.manifest.sourceRevision),
    generatedAt: options.generatedAt ?? new Date().toISOString(),
    matrix: rows,
    gaps,
    promptPrependMap
  };
}

function normalizePack(pack: GeneratedPack): PaiResourceMeta[] {
  const packName = asString(pack.name, "Unknown");
  const skillUri = asString(pack.uri, `pai://skill/${packName}`);
  const skill: PaiResourceMeta = {
    uri: skillUri,
    kind: "skill",
    name: packName,
    pack: packName,
    summary: asString(pack.desc, `${packName} skill metadata`),
    sourcePath: `${packName}/SKILL.md`,
    integrity: ""
  };
  const workflows = Array.isArray(pack.workflows)
    ? pack.workflows.map((workflow) =>
        normalizePackChild(packName, workflow, "workflow")
      )
    : [];
  const tools = Array.isArray(pack.tools)
    ? pack.tools.map((tool) =>
        normalizePackChild(packName, tool, "skill-tool")
      )
    : [];
  return [skill, ...workflows, ...tools];
}

function normalizePackChild(
  packName: string,
  child: unknown,
  kind: "skill-tool" | "workflow"
): PaiResourceMeta {
  const childRecord = asRecord(child);
  const sourcePath = asString(childRecord?.path, asString(child, ""));
  const name = basename(sourcePath);
  const uriKind = kind === "skill-tool" ? "tool" : "workflow";
  return {
    uri: asString(childRecord?.uri, `pai://skill/${packName}/${uriKind}/${name}`),
    kind,
    name: asString(childRecord?.name, name),
    pack: packName,
    summary: `${packName} ${uriKind} metadata`,
    sourcePath,
    integrity: ""
  };
}

function normalizeNamedPath(item: GeneratedNamedPath, kind: "agent" | "command" | "hook" | "tool"): PaiResourceMeta {
  const name = asString(item.name, "Unknown");
  return {
    uri: asString(item.uri, `pai://${kind}/${name}`),
    kind,
    name: kind === "command" ? `/${name}` : name,
    pack: kind,
    summary: `${name} ${kind} metadata`,
    sourcePath: asString(item.path, ""),
    integrity: ""
  };
}

function normalizeAlgorithmEntry(item: GeneratedNamedPath): PaiResourceMeta[] {
  const resource = normalizeAlgorithmPath(item);
  if (resource.uri !== "pai://algorithm/v6.3.0") {
    return [resource];
  }
  return [
    resource,
    ...algorithmPhases.map((phase) => ({
      uri: algorithmPhaseUri(phase),
      kind: "algorithm" as const,
      name: phase,
      pack: "algorithm",
      summary: `${phase} algorithm doctrine slice`,
      sourcePath: `${resource.sourcePath}#phase=${phase}`,
      integrity: resource.integrity
    }))
  ];
}

function normalizeAlgorithmPath(item: GeneratedNamedPath): PaiResourceMeta {
  const name = asString(item.name, "Unknown");
  return {
    uri: asString(item.uri, `pai://algorithm/${name}`),
    kind: "algorithm",
    name,
    pack: "algorithm",
    summary: `${name} algorithm metadata`,
    sourcePath: asString(item.path, ""),
    integrity: ""
  };
}

function normalizeFeedbackLoop(loop: GeneratedFeedbackLoop): FeedbackLoopMeta {
  return {
    id: asString(loop.id, "unknown-loop"),
    event: normalizeFeedbackEvent(asString(loop.trigger, "unknown")),
    resourceUri: asString(loop.uri, "pai://loop/unknown")
  };
}

function normalizeCheck(check: GeneratedCheck): CheckMeta {
  const id = asString(check.id, "unknown-check");
  return {
    id,
    resourceUri: asString(check.uri, `pai://check/${id}`),
    description: asString(check.description, id)
  };
}

function parityRow(
  surface: ParitySurface,
  expected: number,
  represented: number,
  canonicalSamples: string[]
): ParityMatrixRow {
  const status: ParityStatus =
    represented === expected ? "covered" : represented === 0 ? "missing" : "partial";
  return {
    surface,
    expected,
    represented,
    status,
    missingSamples:
      status === "covered"
        ? []
        : canonicalSamples.length > 0
          ? canonicalSamples.slice(0, 10)
          : [`${surface}:canonical-items-not-represented`]
  };
}

function buildPromptPrependMap(): PromptPrependMapping[] {
  return [
    {
      target: "top-level-session",
      prepended: "pai://system-prompt/PAI_SYSTEM_PROMPT.md",
      sourcePath: "PAI/PAI_SYSTEM_PROMPT.md"
    },
    {
      target: "top-level-session",
      prepended: "pai://claude/CLAUDE.md",
      sourcePath: "CLAUDE.md"
    },
    {
      target: "top-level-session",
      prepended: "pai://claude/imports/startup-context",
      sourcePath: "CLAUDE.md @imports"
    },
    {
      target: "skill-editing-workflow",
      prepended: "pai://skills/CLAUDE.md",
      sourcePath: "skills/CLAUDE.md"
    },
    {
      target: "agent-spawn",
      prepended: "pai://agent/{name}",
      sourcePath: "agents/{name}.md"
    }
  ];
}

function representedEffortLevelCount(): number {
  return ["E1", "E2", "E3", "E4", "E5"].filter((effort) =>
    /^E[1-5]$/.test(effort)
  ).length;
}

function representedFunctionCount(functions: GeneratedFunctionEntry[] | undefined): number {
  return Array.isArray(functions) ? functions.length : 0;
}

function arrayLength(value: unknown): number {
  return Array.isArray(value) ? value.length : 0;
}

function sampleNames(items: unknown): string[] {
  return Array.isArray(items)
    ? items.map((item) => asString(asRecord(item)?.name, "Unknown"))
    : [];
}

function sampleCheckNames(items: GeneratedCheck[] | undefined): string[] {
  return Array.isArray(items)
    ? items.map((item) => asString(item.id, "unknown-check"))
    : [];
}

function sampleLoopNames(items: unknown): string[] {
  return Array.isArray(items)
    ? items.map((item) => asString(asRecord(item)?.id, "unknown-loop"))
    : [];
}

function sampleFunctionNames(items: GeneratedFunctionEntry[] | undefined): string[] {
  return Array.isArray(items)
    ? items.map((item) => {
        const file = asString(item.file, "unknown-file");
        const symbols = Array.isArray(item.symbols) ? item.symbols : [];
        const symbol = asString(symbols[0], "unknown-symbol");
        return `${file}:${symbol}`;
      })
    : [];
}

function samplePackChildren(
  packs: GeneratedPack[] | undefined,
  key: "tools" | "workflows"
): string[] {
  if (!Array.isArray(packs)) {
    return [];
  }
  return packs.flatMap((pack) => {
    const packName = asString(pack.name, "Unknown");
    const children = Array.isArray(pack[key]) ? pack[key] : [];
    return children.map((child) => {
      const childRecord = asRecord(child);
      return `${packName}/${asString(childRecord?.name, asString(child, ""))}`;
    });
  });
}

function asString(value: unknown, fallback: string): string {
  return typeof value === "string" ? value : fallback;
}

function asNumber(value: unknown): number {
  return typeof value === "number" ? value : 0;
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function extractAlgorithmPhase(body: string, phase: string): string {
  const heading = new RegExp(`^#{1,6}\\s+${escapeRegExp(phase)}\\s*$`, "im");
  const match = heading.exec(body);
  if (match?.index === undefined) {
    throw new Error(`Algorithm phase not found: ${phase}`);
  }
  const afterHeading = match.index + match[0].length;
  const rest = body.slice(afterHeading).replace(/^\r?\n/, "");
  const nextHeading = /^#{1,6}\s+[A-Z][A-Z0-9 _-]*\s*$/m.exec(rest);
  return (nextHeading === null ? rest : rest.slice(0, nextHeading.index)).trim();
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function uniquifyResourceUris(resources: PaiResourceMeta[]): PaiResourceMeta[] {
  const seen = new Set<string>();
  return resources.map((resource) => {
    if (!seen.has(resource.uri)) {
      seen.add(resource.uri);
      return resource;
    }
    const uri = `${resource.uri}#${encodeURIComponent(resource.sourcePath)}`;
    seen.add(uri);
    return { ...resource, uri };
  });
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : undefined;
}

function basename(path: string): string {
  const parts = path.split("/");
  const file = parts[parts.length - 1];
  return file.replace(/\.[^.]+$/, "");
}

function algorithmPhaseUri(phase: AlgorithmPhase): string {
  return `pai://algorithm/6.3.0/phase/${phase.toLowerCase()}`;
}

function hookEventName(name: string): string {
  return name.replace(/\.hook\.(ts|js|sh)$/i, "").replace(/\.(ts|js|sh)$/i, "");
}

function normalizeFeedbackEvent(event: string): string {
  if (event === "Tool failure / non-zero command") {
    return "tool_failed";
  }
  if (event === "Algorithm LEARN E2+") {
    return "Algorithm LEARN";
  }
  return event;
}

function itemsFor(resources: PaiResourceMeta[], kind: ResourceKind): ControlCenterItem[] {
  return resources
    .filter((resource) => resource.kind === kind)
    .map((resource) => ({ name: resource.name, uri: resource.uri }));
}

function copyCriterion(criterion: IsaCriterion): IsaCriterion {
  return {
    ...criterion,
    evidence: criterion.evidence === undefined ? undefined : { ...criterion.evidence }
  };
}

function copyRuntimeLeases(leases: RuntimeLease[]): RuntimeLease[] {
  return leases.map((lease) => ({ ...lease }));
}
