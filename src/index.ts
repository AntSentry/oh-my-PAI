export type ResourceKind =
  | "agent"
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

export interface ControlCenterSnapshot {
  agents: ControlCenterItem[];
  checks: ControlCenterCheckItem[];
  commands: ControlCenterItem[];
  feedbackLoops: ControlCenterLoopItem[];
  hooks: ControlCenterItem[];
  skills: ControlCenterItem[];
  tools: ControlCenterItem[];
  workflows: ControlCenterItem[];
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
      ...tools.map((tool) => normalizeNamedPath(tool, "tool"))
    ]),
    triggers: [],
    checks: [],
    feedbackLoops: []
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
      const body = await reader.read(resource.sourcePath);
      const actualIntegrity = reader.hash(body);
      if (actualIntegrity !== resource.integrity) {
        throw new Error(`Integrity mismatch for ${uri}`);
      }
      return { ...resource, body };
    }
  };
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
        uri: `pai://algorithm/phase/${to}`,
        phase: to,
        active: true
      };
      activeLeases.push(lease);
      const from = phase;
      phase = to;
      return { from, to, lease: { ...lease }, checks };
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
    skills: itemsFor(manifest.resources, "skill"),
    tools: [
      ...itemsFor(manifest.resources, "tool"),
      ...itemsFor(manifest.resources, "skill-tool")
    ],
    workflows: itemsFor(manifest.resources, "workflow")
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

function asString(value: unknown, fallback: string): string {
  return typeof value === "string" ? value : fallback;
}

function asNumber(value: unknown): number {
  return typeof value === "number" ? value : 0;
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
