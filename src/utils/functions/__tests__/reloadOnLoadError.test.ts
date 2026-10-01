import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const reload = vi.fn();

type Module = typeof import("../reloadOnLoadError");

/** Fresh module per test: the "reload under way" flag lives in the module. */
const load = async (): Promise<Module> => {
  vi.resetModules();

  return import("../reloadOnLoadError");
};

beforeEach(() => {
  reload.mockClear();
  sessionStorage.clear();
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-10-01T10:00:00Z"));
  Object.defineProperty(window, "location", {
    configurable: true,
    value: { ...window.location, reload },
  });
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("isLoadError", () => {
  it.each([
    "Failed to fetch dynamically imported module: https://x.test/assets/Page-abc.js",
    "error loading dynamically imported module: https://x.test/assets/Page-abc.js",
    "Importing a module script failed.",
    "Unable to preload CSS for /assets/Page-abc.css",
    'Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "text/html".',
  ])("recognises %s", async (message) => {
    const { isLoadError } = await load();

    expect(isLoadError(new TypeError(message))).toBe(true);
  });

  it("recognises a chunk load error by its name", async () => {
    const { isLoadError } = await load();
    const error = new Error("boom");
    error.name = "ChunkLoadError";

    expect(isLoadError(error)).toBe(true);
  });

  it.each([
    new Error("Cannot read properties of undefined"),
    new TypeError("Failed to fetch"),
    "Failed to fetch dynamically imported module",
    null,
    undefined,
    42,
  ])("does not take %s for a load error", async (error) => {
    const { isLoadError } = await load();

    expect(isLoadError(error)).toBe(false);
  });
});

describe("reloadOnceForLoadError", () => {
  it("reloads the first time", async () => {
    const { reloadOnceForLoadError } = await load();

    expect(reloadOnceForLoadError()).toBe(true);
    expect(reload).toHaveBeenCalledTimes(1);
  });

  it("does not reload a second time shortly after the first", async () => {
    const first = await load();
    first.reloadOnceForLoadError();

    // The page comes back as a fresh module with the same session storage.
    vi.advanceTimersByTime(5_000);
    const second = await load();

    expect(second.reloadOnceForLoadError()).toBe(false);
    expect(reload).toHaveBeenCalledTimes(1);
  });

  it("reloads again once the lock has expired", async () => {
    const first = await load();
    first.reloadOnceForLoadError();

    vi.advanceTimersByTime(120_000);
    const second = await load();

    expect(second.reloadOnceForLoadError()).toBe(true);
    expect(reload).toHaveBeenCalledTimes(2);
  });

  it("does not reload without usable storage", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("denied");
    });
    const { reloadOnceForLoadError } = await load();

    expect(reloadOnceForLoadError()).toBe(false);
    expect(reload).not.toHaveBeenCalled();
  });
});

describe("installPreloadErrorReload", () => {
  it("reloads once on a failed preload and holds back the error", async () => {
    const { installPreloadErrorReload } = await load();
    const remove = installPreloadErrorReload();

    const event = new Event("vite:preloadError", { cancelable: true });
    window.dispatchEvent(event);

    expect(reload).toHaveBeenCalledTimes(1);
    expect(event.defaultPrevented).toBe(true);
    remove();
  });

  it("leaves the error alone when the reload is blocked", async () => {
    sessionStorage.setItem("mfLoadErrorReload", String(Date.now()));
    const { installPreloadErrorReload } = await load();
    const remove = installPreloadErrorReload();

    const event = new Event("vite:preloadError", { cancelable: true });
    window.dispatchEvent(event);

    expect(reload).not.toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(false);
    remove();
  });
});
