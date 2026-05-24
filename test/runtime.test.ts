import { describe, expect, test } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  buildParityReport,
  createAlgorithmStateMachine,
  createCheckRunner,
  createAdapterRegistry,
  createManifestAdapterRegistry,
  createControlCenterSnapshot,
  createHookSubscriptionIndex,
  createIterativeLoopController,
  createFeedbackLoopRuntime,
  createIsaRecord,
  createRuntimeOrchestrator,
  classifyEffort,
  createSafeEffortClassifier,
  createManifestIndex,
  createResourceResolver,
  createTriggerDispatcher,
  loadManifest,
  type PackManifest
} from "../src/index.js";

const manifestPath = fileURLToPath(new URL("../PAIAnalog.manifest.json", import.meta.url));
const manifestJson = JSON.parse(readFileSync(manifestPath, "utf8")) as unknown;

const manifest: PackManifest = {
  id: "pai-analog",
  version: "0.1.0-spec",
  sourceRevision: "abc123",
  totals: {
    packs: 2,
    skills: 2,
    workflows: 2,
    agents: 1,
    commands: 1,
    hooks: 1,
    skillTools: 1,
    tools: 1
  },
  resources: [
    {
      uri: "pai://skill/Council",
      kind: "skill",
      name: "Council",
      pack: "Council",
      summary: "Multi-agent debate",
      sourcePath: "skills/Council/SKILL.md",
      integrity: "sha256-council"
    },
    {
      uri: "pai://skill/Council/workflow/Debate",
      kind: "workflow",
      name: "Debate",
      pack: "Council",
      summary: "Run a structured debate",
      sourcePath: "skills/Council/Workflows/Debate.md",
      integrity: "sha256-debate"
    },
    {
      uri: "pai://skill/Research",
      kind: "skill",
      name: "Research",
      pack: "Research",
      summary: "Research workflows",
      sourcePath: "skills/Research/SKILL.md",
      integrity: "sha256-research"
    },
    {
      uri: "pai://skill/Research/workflow/Search",
      kind: "workflow",
      name: "Search",
      pack: "Research",
      summary: "Search with sources",
      sourcePath: "skills/Research/Workflows/Search.md",
      integrity: "sha256-search"
    },
    {
      uri: "pai://agent/Forge",
      kind: "agent",
      name: "Forge",
      pack: "Agents",
      summary: "Implementation agent",
      sourcePath: "agents/Forge.md",
      integrity: "sha256-forge"
    },
    {
      uri: "pai://tool/Inference",
      kind: "tool",
      name: "Inference",
      pack: "Tools",
      summary: "Model router",
      sourcePath: "Tools/Inference.ts",
      integrity: "sha256-inference"
    },
    {
      uri: "pai://skill/Council/tool/Moderate",
      kind: "skill-tool",
      name: "Moderate",
      pack: "Council",
      summary: "Moderate council debate",
      sourcePath: "skills/Council/Tools/Moderate.ts",
      integrity: "sha256-moderate"
    },
    {
      uri: "pai://command/Council",
      kind: "command",
      name: "/Council",
      pack: "Council",
      summary: "Start council",
      sourcePath: "commands/Council.md",
      integrity: "sha256-command"
    },
    {
      uri: "pai://hook/SessionEnd",
      kind: "hook",
      name: "SessionEnd",
      pack: "Hooks",
      summary: "Session learning hook",
      sourcePath: "hooks/SessionEnd.ts",
      integrity: "sha256-sessionend"
    }
  ],
  triggers: [
    {
      id: "council-command",
      event: "command",
      pattern: "/Council",
      emits: ["pai://skill/Council/workflow/Debate"]
    },
    {
      id: "debate-agent",
      event: "resource",
      pattern: "pai://skill/Council/workflow/Debate",
      emits: ["pai://agent/Forge"]
    },
    {
      id: "cycle-a",
      event: "resource",
      pattern: "pai://tool/Inference",
      emits: ["pai://tool/Inference"]
    }
  ],
  checks: [
    {
      id: "inventory-counts",
      resourceUri: "pai://check/inventory-counts",
      description: "Audit totals must match manifest resources"
    }
  ],
  feedbackLoops: [
    {
      id: "tool-failure-learning",
      event: "tool_failed",
      resourceUri: "pai://loop/tool-failure-learning"
    }
  ]
};

describe("manifest loading", () => {
  test("normalizes generated manifest resources without loading body content", () => {
    const generated = {
      id: "pai-analog",
      version: "0.1.0-spec",
      source: { head: "rev" },
      totals: {
        packs: 1,
        v5Skills: 1,
        v5Workflows: 1,
        v5Agents: 1,
        v5Commands: 1,
        v5Hooks: 1,
        v5SkillTools: 1,
        v5PaiTools: 1
      },
      resources: {
        packs: [
          {
            name: "Council",
            workflowCount: 1,
            workflows: ["src/Workflows/Debate.md"],
            tools: ["src/Tools/Moderate.ts"]
          }
        ],
        agents: [{ name: "Forge", path: "agents/Forge.md" }],
        commands: [{ name: "Council", path: "commands/Council.md" }],
        hooks: [{ name: "SessionEnd", path: "hooks/SessionEnd.ts" }]
      }
    };

    const loaded = loadManifest(generated);

    expect(loaded.sourceRevision).toBe("rev");
    expect(loaded.totals).toEqual({
      packs: 1,
      skills: 1,
      workflows: 1,
      agents: 1,
      commands: 1,
      hooks: 1,
      skillTools: 1,
      tools: 1
    });
    expect(loaded.resources.map((resource) => resource.uri)).toEqual([
      "pai://skill/Council",
      "pai://skill/Council/workflow/Debate",
      "pai://skill/Council/tool/Moderate",
      "pai://agent/Forge",
      "pai://command/Council",
      "pai://hook/SessionEnd"
    ]);
    expect(JSON.stringify(loaded.resources)).not.toContain("SKILL body");
  });

  test("rejects malformed manifests and duplicate resource URIs", () => {
    expect(() => loadManifest({ version: "missing id" })).toThrow("manifest id");
    expect(() =>
      createManifestIndex({
        ...manifest,
        resources: [manifest.resources[0], manifest.resources[0]]
      })
    ).toThrow("Duplicate resource URI");
  });

  test("uses safe defaults for sparse generated manifests", () => {
    expect(loadManifest({ id: "empty" })).toEqual({
      id: "empty",
      version: "0.0.0",
      sourceRevision: "unknown",
      totals: {
        packs: 0,
        skills: 0,
        workflows: 0,
        agents: 0,
        commands: 0,
      hooks: 0,
      skillTools: 0,
      tools: 0
      },
      resources: [],
      triggers: [],
      checks: [],
      feedbackLoops: []
    });
    expect(
      loadManifest({
        id: "fallbacks",
        resources: {
          packs: [{ workflows: [42], tools: [false] }, {}],
          agents: [{}],
          commands: [{}],
          hooks: [{}]
        }
      }).resources.map((resource) => resource.uri)
    ).toEqual([
      "pai://skill/Unknown",
      "pai://skill/Unknown/workflow/",
      "pai://skill/Unknown/tool/",
      "pai://skill/Unknown#Unknown%2FSKILL.md",
      "pai://agent/Unknown",
      "pai://command/Unknown",
      "pai://hook/Unknown"
    ]);
  });
});

describe("manifest index", () => {
  test("lists resources by kind and enforces audited totals", () => {
    const index = createManifestIndex(manifest);

    expect(index.list()).toHaveLength(manifest.resources.length);
    expect(index.list("workflow").map((resource) => resource.name)).toEqual([
      "Debate",
      "Search"
    ]);
    expect(index.get("pai://agent/Forge")?.sourcePath).toBe("agents/Forge.md");
    expect(index.validateTotals()).toEqual([]);
  });

  test("reports count drift without throwing", () => {
    const index = createManifestIndex({
      ...manifest,
      totals: { ...manifest.totals, workflows: 9 }
    });

    expect(index.validateTotals()).toEqual([
      "Expected 9 workflow resources, found 2"
    ]);
  });

  test("validates the checked-in generated PAI analog manifest totals", () => {
    const loaded = loadManifest(manifestJson);
    const index = createManifestIndex(loaded);

    expect(loaded.totals).toMatchObject({
      skills: 45,
      workflows: 171,
      agents: 18,
      commands: 3,
      hooks: 68,
      skillTools: 38,
      tools: 72
    });
    expect(index.validateTotals()).toEqual([]);
    expect(index.get("pai://skill/Agents/workflow/CreateCustomAgent")).toMatchObject({
      kind: "workflow",
      name: "CreateCustomAgent"
    });
    expect(
      index.get(
        "pai://skill/Prompting/tool/RenderTemplate.ts#Tools%2FRenderTemplate.ts"
      )
    ).toMatchObject({
      kind: "skill-tool",
      sourcePath: "Tools/RenderTemplate.ts"
    });
    expect(index.get("pai://tool/ActivityParser.ts")).toMatchObject({
      kind: "tool",
      name: "ActivityParser.ts"
    });
    expect(index.get("pai://algorithm/v6.3.0")).toMatchObject({
      kind: "algorithm",
      name: "v6.3.0.md"
    });
    expect(index.get("pai://algorithm/6.3.0/phase/verify")).toMatchObject({
      kind: "algorithm",
      name: "VERIFY",
      sourcePath: "v6.3.0.md#phase=VERIFY"
    });
    expect(loaded.checks).toHaveLength(41);
    expect(loaded.checks[0]).toEqual({
      id: "mode-classifier-present",
      resourceUri: "pai://check/mode-classifier-present",
      description: "mode-classifier-present"
    });
    expect(loaded.feedbackLoops).toHaveLength(32);
    expect(loaded.feedbackLoops[0]).toEqual({
      id: "prompt-mode-tier",
      event: "UserPromptSubmit",
      resourceUri: "pai://loop/prompt-mode-tier"
    });
    expect(loaded.feedbackLoops).toEqual(
      expect.arrayContaining([
        {
          id: "tool-failure-learning",
          event: "tool_failed",
          resourceUri: "pai://loop/tool-failure-learning"
        },
        {
          id: "session-learning",
          event: "SessionEnd",
          resourceUri: "pai://loop/session-learning"
        },
        {
          id: "learning-router",
          event: "Algorithm LEARN",
          resourceUri: "pai://loop/learning-router"
        },
        {
          id: "algorithm-reflection",
          event: "Algorithm LEARN",
          resourceUri: "pai://loop/algorithm-reflection"
        }
      ])
    );
  });
});

describe("lazy resource resolver", () => {
  test("loads only the requested resource body and checks integrity", async () => {
    const reads: string[] = [];
    const resolver = createResourceResolver(createManifestIndex(manifest), {
      read: async (path) => {
        reads.push(path);
        return `body:${path}`;
      },
      hash: (body) => `sha256-${body.split("/").pop()?.split(".")[0]?.toLowerCase()}`
    });

    await expect(
      resolver.resolve("pai://skill/Council/workflow/Debate")
    ).resolves.toMatchObject({
      uri: "pai://skill/Council/workflow/Debate",
      body: "body:skills/Council/Workflows/Debate.md"
    });
    expect(reads).toEqual(["skills/Council/Workflows/Debate.md"]);
  });

  test("rejects unknown resources and integrity mismatches", async () => {
    const resolver = createResourceResolver(createManifestIndex(manifest), {
      read: async () => "changed",
      hash: () => "sha256-changed"
    });

    await expect(resolver.resolve("pai://missing")).rejects.toThrow(
      "Unknown resource"
    );
    await expect(resolver.resolve("pai://agent/Forge")).rejects.toThrow(
      "Integrity mismatch"
    );
  });

  test("resolves algorithm phase resources by loading only the requested doctrine slice", async () => {
    const phaseManifest: PackManifest = {
      ...manifest,
      totals: { ...manifest.totals, agents: 0, commands: 0, hooks: 0, skillTools: 0, skills: 0, tools: 0, workflows: 0 },
      resources: [
        {
          uri: "pai://algorithm/6.3.0/phase/verify",
          kind: "algorithm",
          name: "VERIFY",
          pack: "algorithm",
          summary: "VERIFY doctrine",
          sourcePath: "Algorithm/v6.3.0.md#phase=VERIFY",
          integrity: "sha256-verify"
        }
      ]
    };
    const reads: string[] = [];
    const resolver = createResourceResolver(createManifestIndex(phaseManifest), {
      read: async (path) => {
        reads.push(path);
        return [
          "## OBSERVE",
          "observe body",
          "## VERIFY",
          "verify body",
          "## LEARN",
          "learn body"
        ].join("\n");
      },
      hash: (body) => `sha256-${body.split(" ")[0]}`
    });

    await expect(
      resolver.resolve("pai://algorithm/6.3.0/phase/verify")
    ).resolves.toMatchObject({
      body: "verify body"
    });
    expect(reads).toEqual(["Algorithm/v6.3.0.md"]);
  });

  test("rejects algorithm phase resources when the phase heading is missing", async () => {
    const phaseManifest: PackManifest = {
      ...manifest,
      resources: [
        {
          uri: "pai://algorithm/6.3.0/phase/verify",
          kind: "algorithm",
          name: "VERIFY",
          pack: "algorithm",
          summary: "VERIFY doctrine",
          sourcePath: "Algorithm/v6.3.0.md#phase=VERIFY",
          integrity: "sha256-verify"
        }
      ]
    };
    const resolver = createResourceResolver(createManifestIndex(phaseManifest), {
      read: async () => "## OBSERVE\nobserve body",
      hash: (body) => body
    });

    await expect(
      resolver.resolve("pai://algorithm/6.3.0/phase/verify")
    ).rejects.toThrow("Algorithm phase not found: VERIFY");
  });

  test("resolves an algorithm phase slice at the end of a doctrine file", async () => {
    const phaseManifest: PackManifest = {
      ...manifest,
      resources: [
        {
          uri: "pai://algorithm/6.3.0/phase/learn",
          kind: "algorithm",
          name: "LEARN",
          pack: "algorithm",
          summary: "LEARN doctrine",
          sourcePath: "Algorithm/v6.3.0.md#phase=LEARN",
          integrity: "sha256-learn"
        }
      ]
    };
    const resolver = createResourceResolver(createManifestIndex(phaseManifest), {
      read: async () => "## VERIFY\nverify body\n## LEARN\nlearn body",
      hash: (body) => `sha256-${body.split(" ")[0]}`
    });

    await expect(
      resolver.resolve("pai://algorithm/6.3.0/phase/learn")
    ).resolves.toMatchObject({
      body: "learn body"
    });
  });
});

describe("trigger dispatcher", () => {
  test("recursively dispatches matching triggers within depth budget", () => {
    const dispatcher = createTriggerDispatcher(manifest.triggers, {
      maxDepth: 3,
      maxEmits: 5
    });

    expect(dispatcher.dispatch({ event: "command", value: "/Council" })).toEqual([
      {
        depth: 0,
        triggerId: "council-command",
        uri: "pai://skill/Council/workflow/Debate"
      },
      {
        depth: 1,
        triggerId: "debate-agent",
        uri: "pai://agent/Forge"
      }
    ]);
  });

  test("guards cycles and emission budgets", () => {
    const cycleDispatcher = createTriggerDispatcher(manifest.triggers, {
      maxDepth: 3,
      maxEmits: 5
    });
    const budgetDispatcher = createTriggerDispatcher(manifest.triggers, {
      maxDepth: 3,
      maxEmits: 1
    });

    expect(
      cycleDispatcher.dispatch({ event: "resource", value: "pai://tool/Inference" })
    ).toEqual([
      {
        depth: 0,
        triggerId: "cycle-a",
        uri: "pai://tool/Inference"
      }
    ]);
    expect(() =>
      budgetDispatcher.dispatch({ event: "command", value: "/Council" })
    ).toThrow("Trigger emission budget exceeded");
  });

  test("returns no emissions for unmatched events and stops at depth limit", () => {
    const dispatcher = createTriggerDispatcher(manifest.triggers, {
      maxDepth: 0,
      maxEmits: 5
    });

    expect(dispatcher.dispatch({ event: "command", value: "/Missing" })).toEqual([]);
    expect(dispatcher.dispatch({ event: "command", value: "/Council" })).toEqual([
      {
        depth: 0,
        triggerId: "council-command",
        uri: "pai://skill/Council/workflow/Debate"
      }
    ]);
  });

  test("allows declared iterative loops only until stop criteria or budget", () => {
    const byCriterion = createIterativeLoopController({
      maxIterations: 5,
      shouldStop: (iteration) => iteration === 2
    });
    expect(byCriterion.next()).toEqual({ iteration: 1, stopped: false });
    expect(byCriterion.next()).toEqual({ iteration: 2, stopped: false });
    expect(byCriterion.next()).toEqual({ iteration: 2, stopped: true });

    const byBudget = createIterativeLoopController({
      maxIterations: 1,
      shouldStop: () => false
    });
    expect(byBudget.next()).toEqual({ iteration: 1, stopped: false });
    expect(byBudget.next()).toEqual({ iteration: 1, stopped: true });
  });
});

describe("effort classifier", () => {
  test("honors explicit effort overrides", () => {
    expect(classifyEffort("/e1 say hi")).toEqual({
      mode: "NATIVE",
      effort: "E1",
      reason: "explicit override"
    });
    expect(classifyEffort("/e5 rebuild the runtime")).toEqual({
      mode: "ALGORITHM",
      effort: "E5",
      reason: "explicit override"
    });
    expect(classifyEffort("/e2 outline the work")).toEqual({
      mode: "ALGORITHM",
      effort: "E2",
      reason: "explicit override"
    });
  });

  test("classifies minimal, native, and algorithm requests", () => {
    expect(classifyEffort("thanks")).toMatchObject({ mode: "MINIMAL" });
    expect(classifyEffort("OK.")).toMatchObject({ mode: "MINIMAL" });
    expect(classifyEffort("what time is it?")).toMatchObject({
      mode: "NATIVE",
      effort: "E1"
    });
    expect(classifyEffort("pwd")).toMatchObject({
      mode: "NATIVE",
      effort: "E1"
    });
    expect(classifyEffort("debug the failing tests and refactor the resolver")).toEqual({
      mode: "ALGORITHM",
      effort: "E3",
      reason: "multi-step implementation or investigation"
    });
  });

  test("fails safe to algorithm E3 when an effort classifier throws", () => {
    const classify = createSafeEffortClassifier(() => {
      throw new Error("model unavailable");
    });

    expect(classify("ship the runtime")).toEqual({
      mode: "ALGORITHM",
      effort: "E3",
      reason: "classifier failed: model unavailable"
    });

    const classifyStringFailure = createSafeEffortClassifier(() => {
      throw "timeout";
    });
    expect(classifyStringFailure("ship the runtime")).toMatchObject({
      mode: "ALGORITHM",
      effort: "E3",
      reason: "classifier failed: timeout"
    });
  });
});

describe("executable checks and algorithm phases", () => {
  test("runs registered checks and fails closed for missing checks", async () => {
    const runner = createCheckRunner({
      "pai://check/inventory-counts": async (context) => ({
        passed: context["inventoryOk"] === true,
        evidence: "inventory count comparison"
      })
    });

    await expect(
      runner.run("pai://check/inventory-counts", { inventoryOk: true })
    ).resolves.toEqual({
      uri: "pai://check/inventory-counts",
      passed: true,
      evidence: "inventory count comparison"
    });
    await expect(
      runner.run("pai://check/inventory-counts", { inventoryOk: false })
    ).resolves.toMatchObject({
      uri: "pai://check/inventory-counts",
      passed: false
    });
    await expect(
      runner.run("pai://check/not-registered", {})
    ).rejects.toThrow("No executable check registered");
  });

  test("blocks phase transitions until required checks pass", async () => {
    const runner = createCheckRunner({
      "pai://check/intent-echo": async (context) => ({
        passed: typeof context["intentEcho"] === "string",
        evidence: "intent echo present"
      })
    });
    const machine = createAlgorithmStateMachine({
      initialPhase: "OBSERVE",
      checkRunner: runner,
      phaseChecks: {
        THINK: ["pai://check/intent-echo"]
      }
    });

    await expect(machine.transition("THINK", {})).rejects.toThrow(
      "Blocked phase transition"
    );
    await expect(
      machine.transition("THINK", { intentEcho: "Build the runtime." })
    ).resolves.toMatchObject({
      from: "OBSERVE",
      to: "THINK",
      lease: {
        uri: "pai://algorithm/6.3.0/phase/think",
        phase: "THINK",
        active: true
      }
    });
    expect(machine.current()).toBe("THINK");
  });

  test("expires previous doctrine leases on phase transition", async () => {
    const machine = createAlgorithmStateMachine({
      initialPhase: "OBSERVE",
      checkRunner: createCheckRunner({}),
      phaseChecks: {}
    });

    await machine.transition("THINK", {});
    await machine.transition("PLAN", {});

    expect(machine.leases()).toEqual([
      {
        uri: "pai://algorithm/6.3.0/phase/think",
        phase: "THINK",
        active: false
      },
      {
        uri: "pai://algorithm/6.3.0/phase/plan",
        phase: "PLAN",
        active: true
      }
    ]);
  });

  test("emits phase transition events after checks pass", async () => {
    const events: string[] = [];
    const machine = createAlgorithmStateMachine({
      initialPhase: "OBSERVE",
      checkRunner: createCheckRunner({}),
      phaseChecks: {},
      onTransition: (transition) => {
        events.push(`${transition.from}->${transition.to}:${transition.lease.uri}`);
      }
    });

    await machine.transition("THINK", {});

    expect(events).toEqual([
      "OBSERVE->THINK:pai://algorithm/6.3.0/phase/think"
    ]);
  });
});

describe("ISA criteria and evidence", () => {
  test("selects project or task ISA home from scope", () => {
    expect(createIsaRecord({ scope: "project", id: "oh-my-PAI" }).home).toBe(
      "pai://isa/project/oh-my-PAI"
    );
    expect(createIsaRecord({ scope: "task", id: "phase-6" }).home).toBe(
      "pai://isa/task/phase-6"
    );
  });

  test("maps criteria to checks and requires evidence before completion", () => {
    const isa = createIsaRecord({ scope: "task", id: "runtime" });

    isa.addCriterion({
      id: "C1",
      text: "Runtime validates inventory counts",
      checkUri: "pai://check/inventory-counts"
    });
    expect(isa.criteria()).toEqual([
      {
        id: "C1",
        text: "Runtime validates inventory counts",
        checkUri: "pai://check/inventory-counts",
        status: "open"
      }
    ]);
    expect(() => isa.complete("C1")).toThrow("Verification evidence required");

    isa.attachEvidence("C1", {
      command: "npm test",
      output: "13 tests passed",
      passed: true
    });
    expect(isa.complete("C1")).toEqual({
      id: "C1",
      text: "Runtime validates inventory counts",
      checkUri: "pai://check/inventory-counts",
      status: "complete",
      evidence: {
        command: "npm test",
        output: "13 tests passed",
        passed: true
      }
    });
  });

  test("rejects duplicate criteria and unknown evidence targets", () => {
    const isa = createIsaRecord({ scope: "task", id: "runtime" });

    isa.addCriterion({
      id: "C1",
      text: "One binary probe",
      checkUri: "pai://check/isc-granularity"
    });
    expect(() =>
      isa.addCriterion({
        id: "C1",
        text: "Duplicate",
        checkUri: "pai://check/isc-granularity"
      })
    ).toThrow("Duplicate criterion");
    expect(() =>
      isa.attachEvidence("missing", {
        command: "npm test",
        output: "not run",
        passed: false
      })
    ).toThrow("Unknown criterion");
    expect(() => isa.complete("missing")).toThrow("Unknown criterion");
  });
});

describe("feedback loops and adapters", () => {
  test("executes matching feedback loops without loading unrelated loops", async () => {
    const calls: string[] = [];
    const runtime = createFeedbackLoopRuntime(
      [
        {
          id: "tool-failure-learning",
          event: "tool_failed",
          resourceUri: "pai://loop/tool-failure-learning"
        },
        {
          id: "session-learning",
          event: "session_end",
          resourceUri: "pai://loop/session-learning"
        }
      ],
      {
        "pai://loop/tool-failure-learning": async (payload) => {
          calls.push(`tool:${String(payload["tool"])}`);
          return { loopId: "tool-failure-learning", handled: true };
        },
        "pai://loop/session-learning": async () => {
          calls.push("session");
          return { loopId: "session-learning", handled: true };
        }
      }
    );

    await expect(
      runtime.emit("tool_failed", { tool: "Inference" })
    ).resolves.toEqual([
      { loopId: "tool-failure-learning", handled: true }
    ]);
    expect(calls).toEqual(["tool:Inference"]);
  });

  test("fails closed when a declared feedback loop has no handler", async () => {
    const runtime = createFeedbackLoopRuntime(
      [
        {
          id: "missing",
          event: "tool_failed",
          resourceUri: "pai://loop/missing"
        }
      ],
      {}
    );

    await expect(runtime.emit("tool_failed", {})).rejects.toThrow(
      "No executable feedback loop registered"
    );
    await expect(runtime.emit("unmatched", {})).resolves.toEqual([]);
  });

  test("executes required generated feedback loops for tool failure, SessionEnd, and Algorithm LEARN", async () => {
    const loaded = loadManifest(manifestJson);
    const calls: string[] = [];
    const runtime = createFeedbackLoopRuntime(loaded.feedbackLoops, {
      "pai://loop/tool-failure-learning": async () => {
        calls.push("tool-failure-learning");
        return { loopId: "tool-failure-learning", handled: true };
      },
      "pai://loop/session-learning": async () => {
        calls.push("session-learning");
        return { loopId: "session-learning", handled: true };
      },
      "pai://loop/relationship-memory": async () => {
        calls.push("relationship-memory");
        return { loopId: "relationship-memory", handled: true };
      },
      "pai://loop/learning-router": async () => {
        calls.push("learning-router");
        return { loopId: "learning-router", handled: true };
      },
      "pai://loop/algorithm-reflection": async () => {
        calls.push("algorithm-reflection");
        return { loopId: "algorithm-reflection", handled: true };
      }
    });

    await runtime.emit("tool_failed", {});
    await runtime.emit("SessionEnd", {});
    await runtime.emit("Algorithm LEARN", {});

    expect(calls).toEqual([
      "tool-failure-learning",
      "session-learning",
      "relationship-memory",
      "learning-router",
      "algorithm-reflection"
    ]);
  });

  test("runs tool and hook adapters by URI with payloads", async () => {
    const registry = createAdapterRegistry({
      "pai://tool/Inference": async (payload) => ({
        adapterUri: "pai://tool/Inference",
        output: `model:${String(payload["model"])}`
      }),
      "pai://hook/SessionEnd": async () => ({
        adapterUri: "pai://hook/SessionEnd",
        output: "learned"
      })
    });

    await expect(
      registry.run("pai://tool/Inference", { model: "fast" })
    ).resolves.toEqual({
      adapterUri: "pai://tool/Inference",
      output: "model:fast"
    });
    await expect(registry.run("pai://hook/SessionEnd", {})).resolves.toEqual({
      adapterUri: "pai://hook/SessionEnd",
      output: "learned"
    });
    await expect(registry.run("pai://tool/Missing", {})).rejects.toThrow(
      "No executable adapter registered"
    );
  });

  test("runs manifest-backed adapters by source path without loading source bodies", async () => {
    const registry = createManifestAdapterRegistry(createManifestIndex(manifest), {
      "Tools/Inference.ts": async (payload) => ({
        adapterUri: "Tools/Inference.ts",
        output: `path-model:${String(payload["model"])}`
      }),
      "hooks/SessionEnd.ts": async () => ({
        adapterUri: "hooks/SessionEnd.ts",
        output: "path-learned"
      })
    });

    await expect(
      registry.run("pai://tool/Inference", { model: "fast" })
    ).resolves.toEqual({
      adapterUri: "Tools/Inference.ts",
      output: "path-model:fast"
    });
    await expect(registry.run("pai://hook/SessionEnd", {})).resolves.toEqual({
      adapterUri: "hooks/SessionEnd.ts",
      output: "path-learned"
    });
    await expect(registry.run("pai://agent/Forge", {})).rejects.toThrow(
      "No executable adapter registered for agents/Forge.md"
    );
    await expect(registry.run("pai://tool/Missing", {})).rejects.toThrow(
      "Unknown adapter resource: pai://tool/Missing"
    );
  });
});

describe("hook subscriptions", () => {
  test("derives hook event subscriptions from metadata without loading hook source", () => {
    const subscriptions = createHookSubscriptionIndex(manifest);

    expect(subscriptions).toEqual([
      {
        event: "SessionEnd",
        hookUri: "pai://hook/SessionEnd",
        sourcePath: "hooks/SessionEnd.ts"
      }
    ]);
  });

  test("derives checked-in hook subscriptions from generated manifest metadata", () => {
    const loaded = loadManifest(manifestJson);
    const subscriptions = createHookSubscriptionIndex(loaded);

    expect(subscriptions).toHaveLength(68);
    expect(subscriptions[0]).toEqual({
      event: "AgentInvocation",
      hookUri: "pai://hook/AgentInvocation.hook.ts",
      sourcePath: "AgentInvocation.hook.ts"
    });
  });
});

describe("control center snapshots", () => {
  test("summarizes runtime surfaces from metadata only", () => {
    const snapshot = createControlCenterSnapshot(manifest);

    expect(snapshot).toEqual({
      agents: [{ name: "Forge", uri: "pai://agent/Forge" }],
      checks: [{ id: "inventory-counts", uri: "pai://check/inventory-counts" }],
      commands: [{ name: "/Council", uri: "pai://command/Council" }],
      feedbackLoops: [
        {
          event: "tool_failed",
          id: "tool-failure-learning",
          uri: "pai://loop/tool-failure-learning"
        }
      ],
      hooks: [{ name: "SessionEnd", uri: "pai://hook/SessionEnd" }],
      routes: [
        {
          event: "command",
          id: "council-command",
          pattern: "/Council",
          emits: ["pai://skill/Council/workflow/Debate"]
        },
        {
          event: "resource",
          id: "debate-agent",
          pattern: "pai://skill/Council/workflow/Debate",
          emits: ["pai://agent/Forge"]
        },
        {
          event: "resource",
          id: "cycle-a",
          pattern: "pai://tool/Inference",
          emits: ["pai://tool/Inference"]
        }
      ],
      skills: [
        { name: "Council", uri: "pai://skill/Council" },
        { name: "Research", uri: "pai://skill/Research" }
      ],
      tools: [
        { name: "Inference", uri: "pai://tool/Inference" },
        { name: "Moderate", uri: "pai://skill/Council/tool/Moderate" }
      ],
      workflows: [
        { name: "Debate", uri: "pai://skill/Council/workflow/Debate" },
        { name: "Search", uri: "pai://skill/Research/workflow/Search" }
      ]
    });
    expect(JSON.stringify(snapshot)).not.toContain("sourcePath");
    expect(JSON.stringify(snapshot)).not.toContain("integrity");
  });

  test("summarizes all checked-in manifest agents without body loading", () => {
    const loaded = loadManifest(manifestJson);
    const snapshot = createControlCenterSnapshot(loaded);

    expect(snapshot.agents).toHaveLength(18);
    expect(snapshot.checks).toHaveLength(41);
    expect(snapshot.skills).toHaveLength(45);
    expect(snapshot.workflows).toHaveLength(171);
    expect(snapshot.tools).toHaveLength(110);
  });
});

describe("runtime orchestrator", () => {
  test("classifies prompt, dispatches command triggers, resolves emitted resources, and records leases", async () => {
    const resolved: string[] = [];
    const resolver = {
      async resolve(uri: string) {
        resolved.push(uri);
        const resource = createManifestIndex(manifest).get(uri);
        if (resource === undefined) {
          throw new Error(`missing ${uri}`);
        }
        return { ...resource, body: `body:${uri}` };
      }
    };
    const orchestrator = createRuntimeOrchestrator({
      classify: classifyEffort,
      dispatcher: createTriggerDispatcher(manifest.triggers, {
        maxDepth: 3,
        maxEmits: 5
      }),
      resolver
    });

    await expect(orchestrator.handlePrompt("/Council")).resolves.toEqual({
      classification: {
        mode: "ALGORITHM",
        effort: "E3",
        reason: "multi-step implementation or investigation"
      },
      emissions: [
        {
          depth: 0,
          triggerId: "council-command",
          uri: "pai://skill/Council/workflow/Debate"
        },
        {
          depth: 1,
          triggerId: "debate-agent",
          uri: "pai://agent/Forge"
        }
      ],
      resources: [
        expect.objectContaining({
          uri: "pai://skill/Council/workflow/Debate",
          body: "body:pai://skill/Council/workflow/Debate"
        }),
        expect.objectContaining({
          uri: "pai://agent/Forge",
          body: "body:pai://agent/Forge"
        })
      ],
      leases: [
        {
          uri: "pai://skill/Council/workflow/Debate",
          active: true,
          reason: "trigger:council-command"
        },
        {
          uri: "pai://agent/Forge",
          active: true,
          reason: "trigger:debate-agent"
        }
      ]
    });
    expect(resolved).toEqual([
      "pai://skill/Council/workflow/Debate",
      "pai://agent/Forge"
    ]);
    orchestrator.releaseAll();
    expect(orchestrator.leases()).toEqual([
      {
        uri: "pai://skill/Council/workflow/Debate",
        active: false,
        reason: "trigger:council-command"
      },
      {
        uri: "pai://agent/Forge",
        active: false,
        reason: "trigger:debate-agent"
      }
    ]);
  });

  test("does not resolve resources when no trigger matches", async () => {
    const orchestrator = createRuntimeOrchestrator({
      classify: classifyEffort,
      dispatcher: createTriggerDispatcher(manifest.triggers, {
        maxDepth: 3,
        maxEmits: 5
      }),
      resolver: {
        async resolve(uri: string) {
          throw new Error(`unexpected ${uri}`);
        }
      }
    });

    await expect(orchestrator.handlePrompt("thanks")).resolves.toEqual({
      classification: { mode: "MINIMAL", reason: "acknowledgment" },
      emissions: [],
      resources: [],
      leases: []
    });
  });

  test("directly invoking a resource resolves one body and creates a lease", async () => {
    const resolved: string[] = [];
    const orchestrator = createRuntimeOrchestrator({
      classify: classifyEffort,
      dispatcher: createTriggerDispatcher([], {
        maxDepth: 3,
        maxEmits: 5
      }),
      resolver: {
        async resolve(uri: string) {
          resolved.push(uri);
          const resource = createManifestIndex(manifest).get(uri);
          if (resource === undefined) {
            throw new Error(`missing ${uri}`);
          }
          return { ...resource, body: `body:${uri}` };
        }
      }
    });

    await expect(
      orchestrator.invokeResource("pai://agent/Forge", "control-center")
    ).resolves.toMatchObject({
      uri: "pai://agent/Forge",
      body: "body:pai://agent/Forge"
    });
    expect(resolved).toEqual(["pai://agent/Forge"]);
    expect(orchestrator.leases()).toEqual([
      {
        uri: "pai://agent/Forge",
        active: true,
        reason: "control-center"
      }
    ]);
  });
});

describe("PAI parity report", () => {
  test("classifies canonical parity coverage across every required surface", () => {
    const loaded = loadManifest(manifestJson);
    const report = buildParityReport({
      generatedManifest: manifestJson,
      manifest: loaded
    });

    expect(report.sourceRevision).toBe("2fde1bbe9e8f280cd4998e244b53e3c66f3dc8b9");
    expect(report.matrix.map((row) => row.surface)).toEqual([
      "skills",
      "workflows",
      "skillTools",
      "agents",
      "commands",
      "hooks",
      "tools",
      "algorithm",
      "functions",
      "feedbackLoops",
      "checks",
      "effortLevels",
      "promptPrepend"
    ]);
    expect(report.matrix.find((row) => row.surface === "functions")).toMatchObject({
      expected: 256,
      represented: 256,
      status: "covered"
    });
    expect(report.matrix.find((row) => row.surface === "effortLevels")).toMatchObject({
      expected: 5,
      represented: 5,
      status: "covered"
    });
    expect(report.matrix.find((row) => row.surface === "promptPrepend")).toMatchObject({
      expected: 5,
      represented: 5,
      status: "covered"
    });
    expect(report.gaps).toEqual([]);
    expect(report.promptPrependMap).toEqual([
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
    ]);
  });

  test("surfaces open parity gaps with severity and samples", () => {
    const loaded = loadManifest(manifestJson);
    const generated = manifestJson as { resources: Record<string, unknown> };
    const report = buildParityReport({
      generatedManifest: {
        ...(manifestJson as Record<string, unknown>),
        resources: {
          ...generated.resources,
          functions: []
        }
      },
      manifest: loaded
    });

    expect(report.matrix.find((row) => row.surface === "functions")).toMatchObject({
      expected: 256,
      represented: 0,
      status: "missing"
    });
    expect(report.gaps[0]).toMatchObject({
      surface: "functions",
      severity: "critical",
      expected: 256,
      represented: 0
    });
    expect(report.gaps[0]?.missingSamples.length).toBeGreaterThan(0);
  });

  test("classifies sparse parity input as open gaps without throwing", () => {
    const sparseManifest: PackManifest = {
      id: "sparse",
      version: "0.0.0",
      sourceRevision: "unknown",
      totals: {
        packs: 0,
        skills: 1,
        workflows: 1,
        agents: 1,
        commands: 1,
        hooks: 1,
        skillTools: 1,
        tools: 1
      },
      resources: [],
      triggers: [],
      checks: [],
      feedbackLoops: []
    };

    const report = buildParityReport({
      generatedManifest: { id: "sparse", totals: { v5TsSymbolFiles: 1 } },
      manifest: sparseManifest
    });

    expect(report.matrix.find((row) => row.surface === "workflows")).toEqual({
      surface: "workflows",
      expected: 1,
      represented: 0,
      status: "missing",
      missingSamples: ["workflows:canonical-items-not-represented"]
    });
    expect(report.matrix.find((row) => row.surface === "functions")).toEqual({
      surface: "functions",
      expected: 1,
      represented: 0,
      status: "missing",
      missingSamples: ["functions:canonical-items-not-represented"]
    });
  });

  test("classifies partial parity with canonical samples", () => {
    const partialManifest: PackManifest = {
      id: "partial",
      version: "0.0.0",
      sourceRevision: "unknown",
      totals: {
        packs: 0,
        skills: 1,
        workflows: 2,
        agents: 0,
        commands: 0,
        hooks: 0,
        skillTools: 1,
        tools: 0
      },
      resources: [
        {
          uri: "pai://skill/Agents/workflow/CreateCustomAgent",
          kind: "workflow",
          name: "CreateCustomAgent",
          pack: "Agents",
          summary: "Create custom agent",
          sourcePath: "skills/Agents/Workflows/CreateCustomAgent.md",
          integrity: ""
        },
        {
          uri: "pai://skill/Agents/tool/ComposeAgent.ts",
          kind: "skill-tool",
          name: "ComposeAgent.ts",
          pack: "Agents",
          summary: "Compose agent",
          sourcePath: "skills/Agents/Tools/ComposeAgent.ts",
          integrity: ""
        }
      ],
      triggers: [],
      checks: [],
      feedbackLoops: []
    };

    const report = buildParityReport({
      generatedManifest: {
        id: "partial",
        totals: { v5TsSymbolFiles: 1 },
        resources: {
          skills: [
            {
              name: "Agents",
              workflows: [{ name: "CreateCustomAgent" }, { name: "SpawnTeam" }],
              tools: [{ name: "ComposeAgent.ts" }, {}]
            },
            {
              name: "Research"
            }
          ],
          functions: [{ file: "hooks/Test.ts", symbols: "not-array" }]
        }
      },
      manifest: partialManifest
    });

    expect(report.matrix.find((row) => row.surface === "workflows")).toEqual({
      surface: "workflows",
      expected: 2,
      represented: 1,
      status: "partial",
      missingSamples: ["Agents/CreateCustomAgent", "Agents/SpawnTeam"]
    });
    expect(report.matrix.find((row) => row.surface === "skillTools")).toEqual({
      surface: "skillTools",
      expected: 1,
      represented: 1,
      status: "covered",
      missingSamples: []
    });
    expect(report.matrix.find((row) => row.surface === "functions")).toMatchObject({
      surface: "functions",
      expected: 1,
      represented: 1,
      status: "covered"
    });
    expect(report.gaps.find((gap) => gap.surface === "workflows")).toMatchObject({
      severity: "high"
    });
  });
});
