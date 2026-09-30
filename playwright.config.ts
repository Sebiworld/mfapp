import { defineConfig, devices } from "@playwright/test";

const E2E_PORT = 5174;
const E2E_API_URL = "https://127.0.0.1:8001/api/";

/**
 * Browser tests run against their own Vite instance, pointed at the test backend (port 8001, test database).
 * The process variable takes precedence over `.env.local`, so the dev backend is never used.
 */
export default defineConfig({
  testDir: "./e2e",
  globalSetup: "./e2e/globalSetup.ts",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [["list"]],
  outputDir: "./test-results",
  use: {
    baseURL: `http://127.0.0.1:${E2E_PORT}`,
    trace: "off",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `npx vite --port ${E2E_PORT} --strictPort --host 127.0.0.1`,
    url: `http://127.0.0.1:${E2E_PORT}`,
    reuseExistingServer: false,
    env: { VITE_APIURL: E2E_API_URL },
    timeout: 60_000,
  },
});
