import { describe, expect, test } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  createAlgorithmStateMachine,
  createCheckRunner,
  createIsaRecord,
  classifyEffort,
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
        uri: "pai://algorithm/phase/THINK",
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
        uri: "pai://algorithm/phase/THINK",
        phase: "THINK",
        active: false
      },
      {
        uri: "pai://algorithm/phase/PLAN",
        phase: "PLAN",
        active: true
      }
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
