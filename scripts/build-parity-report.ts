import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { buildParityReport, loadManifest, type ParityReport } from "../src/index.js";

const manifestPath = resolve("PAIAnalog.manifest.json");
const outJsonPath = resolve("reports/pai-parity-report.json");
const outMarkdownPath = resolve("reports/pai-parity-report.md");

const generatedManifest = JSON.parse(await readFile(manifestPath, "utf8")) as unknown;
const manifest = loadManifest(generatedManifest);
const report = buildParityReport({ generatedManifest, manifest });

await mkdir(dirname(outJsonPath), { recursive: true });
await writeFile(outJsonPath, `${JSON.stringify(report, null, 2)}\n`);
await writeFile(outMarkdownPath, renderMarkdown(report));

console.log(`wrote ${outJsonPath}`);
console.log(`wrote ${outMarkdownPath}`);
console.log(`gaps ${report.gaps.length}`);

function renderMarkdown(report: ParityReport): string {
  const rows = report.matrix
    .map(
      (row) =>
        `| ${row.surface} | ${row.expected} | ${row.represented} | ${row.status} | ${row.missingSamples.join(", ") || "-"} |`
    )
    .join("\n");
  const gaps =
    report.gaps.length === 0
      ? "No open parity gaps detected by the matrix probes."
      : report.gaps
          .map(
            (gap) =>
              `- ${gap.severity}: ${gap.surface} expected ${gap.expected}, represented ${gap.represented}; samples: ${gap.missingSamples.join(", ")}`
          )
          .join("\n");
  const promptMap = report.promptPrependMap
    .map((entry) => `| ${entry.target} | ${entry.prepended} | ${entry.sourcePath} |`)
    .join("\n");

  return `# PAI OMP Build Parity Report

Source revision: \`${report.sourceRevision}\`
Generated: \`${report.generatedAt}\`

## Functional Matrix

| Surface | Canonical expected | OMP represented | Status | Missing samples |
|---|---:|---:|---|---|
${rows}

## Prompt Prepend Map

| Target | Prepended resource | Source path |
|---|---|---|
${promptMap}

## Gaps

${gaps}
`;
}
