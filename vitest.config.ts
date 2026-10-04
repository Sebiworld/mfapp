import { configDefaults, defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react-swc";

// Separate from vite.config.ts so test runs never need the build-time env globals.
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  define: { __BUILD_ID__: JSON.stringify("test-build") },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    restoreMocks: true,
    // Browser specs are run by Playwright.
    exclude: [...configDefaults.exclude, "e2e/**"],
  },
});
