const RELOAD_STAMP_KEY = "mfLoadErrorReload";
/** A second load error within this time is not answered with another reload. */
const RELOAD_LOCK_MS = 60_000;

const LOAD_ERROR_PATTERN = new RegExp(
  [
    "Failed to fetch dynamically imported module",
    "error loading dynamically imported module",
    "Importing a module script failed",
    "Unable to preload CSS",
    "Failed to load module script",
    "is not a valid JavaScript MIME type",
    "Loading chunk .+ failed",
    "Loading CSS chunk",
  ].join("|"),
  "i"
);

let reloadPending = false;

/**
 * Tells whether an error comes from loading a code chunk, as happens in an open tab after a deploy removed
 * the old files.
 * @param error Anything thrown by a dynamic import or caught by a router.
 * @returns True for failed dynamic imports, failed preloads and chunks answered with the wrong MIME type.
 */
export const isLoadError = (error: unknown): boolean => {
  if (!error || typeof error !== "object") {
    return false;
  }

  const { name, message } = error as { name?: unknown; message?: unknown };

  return (
    name === "ChunkLoadError" ||
    (typeof message === "string" && LOAD_ERROR_PATTERN.test(message))
  );
};

/**
 * Reloads the page once so it picks up the current version. A time stamp in `sessionStorage` blocks a second
 * reload shortly after the first, so a lasting error cannot cause a reload loop. Without usable storage it
 * does not reload at all.
 * @returns True when a reload was started (or is already under way), false when it was blocked.
 */
export const reloadOnceForLoadError = (): boolean => {
  if (reloadPending) {
    return true;
  }

  try {
    const last = Number(sessionStorage.getItem(RELOAD_STAMP_KEY));

    if (last && Date.now() - last < RELOAD_LOCK_MS) {
      return false;
    }

    sessionStorage.setItem(RELOAD_STAMP_KEY, String(Date.now()));
  } catch {
    return false;
  }

  reloadPending = true;
  window.location.reload();

  return true;
};

/**
 * Starts the single reload for failed preloads of code chunks. When no reload happens, the event is left
 * alone so the error reaches the error page.
 * @returns Function that removes the listener again.
 */
export const installPreloadErrorReload = (): (() => void) => {
  const handler = (event: Event): void => {
    if (reloadOnceForLoadError()) {
      event.preventDefault();
    }
  };

  window.addEventListener("vite:preloadError", handler);

  return () => window.removeEventListener("vite:preloadError", handler);
};
