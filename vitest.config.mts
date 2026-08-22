import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    // Each file gets a clean module registry so the env-var tests cannot
    // leak cached config into one another.
    restoreMocks: true,
    clearMocks: true,
  },
  resolve: {
    alias: { "@": import.meta.dirname },
  },
});
