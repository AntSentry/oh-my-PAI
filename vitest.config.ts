import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: ["dist/**", "node_modules/**"],
    include: ["test/**/*.test.ts"],
    coverage: {
      include: ["src/**/*.ts"],
      provider: "v8",
      reporter: ["text"],
      thresholds: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100
      }
    }
  }
});
