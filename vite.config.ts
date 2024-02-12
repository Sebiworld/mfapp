import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react-swc';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [tsconfigPaths(), react(), TanStackRouterVite(),],
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_VERCEL_ENV),
      __APP_GIT_COMMIT_REF__: JSON.stringify(env.VITE_VERCEL_GIT_COMMIT_REF),
      __APP_GIT_COMMIT_SHA__: JSON.stringify(env.VITE_VERCEL_GIT_COMMIT_SHA),
      __APP_APIURL__: JSON.stringify(env.VITE_APIURL),
      __APP_APIKEY__: JSON.stringify(env.VITE_APIKEY),
      __APP_LGLIC__: JSON.stringify(env.VITE_LGLIC)
    }
  }
});
