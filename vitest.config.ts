import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.test.tsx", "**/*.test.ts"],
    globals: true,
    environmentOptions: {
      jsdom: {
        pretendToBeVisual: true,
      },
    },
    env: {
      VITEST: "true",
    },
  },
});
