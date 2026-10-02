import { defineConfig, loadEnv, type Plugin } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react-swc";

import pkg from "./package.json";

/**
 * Writes `version.json` with the build id next to the bundle, so a running app can tell that a newer
 * build was deployed.
 * @param buildId Unique id of this build, identical to the `__BUILD_ID__` constant inside the app.
 * @returns Vite plugin that only acts in builds.
 */
const versionFilePlugin = (buildId: string): Plugin => ({
  name: "emit-version-file",
  apply: "build",
  generateBundle() {
    this.emitFile({
      type: "asset",
      fileName: "version.json",
      source: JSON.stringify({ buildId }),
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const buildId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

  return {
    plugins: [tsconfigPaths(), react(), versionFilePlugin(buildId)],
    define: {
      __NAME__: `"${pkg.name}"`,
      __VERSION__: `"${pkg.version}"`,
      __BUILD_ID__: JSON.stringify(buildId),
      __APP_ENV__: JSON.stringify(env.VERCEL_ENV),
      __APP_GIT_COMMIT_REF__: JSON.stringify(env.VERCEL_GIT_COMMIT_REF),
      __APP_GIT_COMMIT_SHA__: JSON.stringify(env.VERCEL_GIT_COMMIT_SHA),
      __APP_APIURL__: JSON.stringify(env.VITE_APIURL),
      __APP_APIKEY__: JSON.stringify(env.VITE_APIKEY),
      __APP_LGLIC__: JSON.stringify(env.VITE_LGLIC),
    },
  };
});
