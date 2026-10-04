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

/**
 * Adds `modulepreload` links for a lazily loaded module (and the chunks it imports) to `index.html`. Almost every
 * URL renders that module, but as a dynamic import it would only be requested after the main bundle has been
 * downloaded and run; the links let the browser fetch it in parallel with the main bundle.
 * The chunk names carry content hashes, so they are read from the bundle instead of being written by hand.
 * @param moduleSuffix Path ending of the module's source file, e.g. `/src/pages/page/Page.tsx`.
 * @returns Vite plugin that only acts in builds; the build fails when no chunk belongs to the module.
 */
const preloadLazyModulePlugin = (moduleSuffix: string): Plugin => {
  let base = "/";

  return {
    name: "preload-lazy-module",
    apply: "build",
    configResolved(config) {
      base = config.base;
    },
    transformIndexHtml: {
      order: "post",
      handler(_html, ctx) {
        const bundle = ctx.bundle;

        if (!bundle) {
          return [];
        }

        const chunks = Object.values(bundle).filter(
          (output) => output.type === "chunk"
        );
        // The facade id can be empty for dynamic entries, so the chunk is found by the modules it contains.
        const target = chunks.find(
          (chunk) =>
            chunk.isDynamicEntry &&
            chunk.moduleIds.some((id) => id.endsWith(moduleSuffix))
        );

        if (!target) {
          throw new Error(`preload-lazy-module: no chunk for ${moduleSuffix}`);
        }

        // Entry chunks are already loaded by index.html; only the lazy chunk and its own static imports are new.
        const files = new Set<string>();
        const styles = new Set<string>();
        const queue = [target.fileName];

        while (queue.length) {
          const fileName = queue.shift() as string;
          const chunk = chunks.find((item) => item.fileName === fileName);

          if (!chunk || chunk.isEntry || files.has(fileName)) {
            continue;
          }

          files.add(fileName);

          for (const css of chunk.viteMetadata?.importedCss ?? []) {
            styles.add(css);
          }

          queue.push(...chunk.imports);
        }

        return [
          ...[...files].map((file) => ({
            tag: "link",
            attrs: {
              rel: "modulepreload",
              crossorigin: true,
              href: base + file,
            },
            injectTo: "head" as const,
          })),
          ...[...styles].map((file) => ({
            tag: "link",
            attrs: {
              rel: "preload",
              as: "style",
              crossorigin: true,
              href: base + file,
            },
            injectTo: "head" as const,
          })),
        ];
      },
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const buildId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

  return {
    plugins: [
      tsconfigPaths(),
      react(),
      versionFilePlugin(buildId),
      preloadLazyModulePlugin("/src/pages/page/Page.tsx"),
    ],
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
