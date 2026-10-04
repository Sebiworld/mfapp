const VERSION_URL = "/version.json";
const RELOAD_STAMP_KEY = "mfVersionReload";
/** Shortest time between two version requests. */
export const VERSION_CHECK_INTERVAL_MS = 5 * 60_000;
/** A version reload within this time after the last one is not repeated, so a stale cache cannot loop. */
const RELOAD_LOCK_MS = 5 * 60_000;

let lastCheckAt = 0;
let isChecking = false;
let isOutdated = false;

/**
 * Asks the server which build is deployed and remembers when it differs from the running one. Requests are
 * throttled; offline or missing files are ignored without a trace.
 * @param buildId Id of the running build.
 * @param now Current time in milliseconds.
 * @returns Resolves once the check is done or skipped.
 */
export const checkForNewVersion = async (
  buildId: string,
  now: number = Date.now()
): Promise<void> => {
  if (
    isChecking ||
    isOutdated ||
    now - lastCheckAt < VERSION_CHECK_INTERVAL_MS
  ) {
    return;
  }

  isChecking = true;

  try {
    const response = await fetch(VERSION_URL, { cache: "no-store" });

    // Any answer from the server counts as a check; only a network failure may be retried right away.
    lastCheckAt = now;

    if (!response.ok) {
      return;
    }

    const body: unknown = await response.json();
    const deployedId =
      body && typeof body === "object"
        ? (body as { buildId?: unknown }).buildId
        : undefined;

    if (typeof deployedId === "string" && deployedId !== buildId) {
      isOutdated = true;
    }
  } catch {
    // Offline, blocked or not JSON: stay on the current version.
  } finally {
    isChecking = false;
  }
};

/**
 * Tells whether a newer build was found since the page was loaded.
 * @returns True once a check saw a different build id.
 */
export const isNewVersionAvailable = (): boolean => isOutdated;

/**
 * Reloads the page completely when a newer build is known. Meant to run right after a page change, so the
 * target URL is loaded fresh and nothing is interrupted while someone reads or types. A time stamp in
 * `sessionStorage` blocks repeated reloads; without usable storage it does not reload.
 * @returns True when a reload was started.
 */
export const reloadIfNewVersionAvailable = (): boolean => {
  if (!isOutdated) {
    return false;
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

  window.location.reload();

  return true;
};

/**
 * Checks for a new build whenever the tab becomes visible again. Does nothing in development.
 * @param buildId Id of the running build.
 * @returns Function that removes the listener again.
 */
export const installVersionCheck = (buildId: string): (() => void) => {
  if (import.meta.env.DEV) {
    return () => undefined;
  }

  const onVisibilityChange = (): void => {
    if (document.visibilityState === "visible") {
      void checkForNewVersion(buildId);
    }
  };

  document.addEventListener("visibilitychange", onVisibilityChange);

  return () =>
    document.removeEventListener("visibilitychange", onVisibilityChange);
};

/** Resets the module state between tests. */
export const resetNewVersionState = (): void => {
  lastCheckAt = 0;
  isChecking = false;
  isOutdated = false;
};
