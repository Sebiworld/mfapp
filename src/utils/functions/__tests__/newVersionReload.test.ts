import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  checkForNewVersion,
  installVersionCheck,
  isNewVersionAvailable,
  reloadIfNewVersionAvailable,
  resetNewVersionState,
  VERSION_CHECK_INTERVAL_MS,
} from "../newVersionReload";

const reload = vi.fn();
const fetchMock = vi.fn();

const answerWith = (buildId: string): void => {
  fetchMock.mockResolvedValue({ ok: true, json: async () => ({ buildId }) });
};

beforeEach(() => {
  reload.mockClear();
  fetchMock.mockReset();
  sessionStorage.clear();
  resetNewVersionState();
  vi.stubGlobal("fetch", fetchMock);
  Object.defineProperty(window, "location", {
    configurable: true,
    value: { ...window.location, reload },
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("checkForNewVersion", () => {
  it("compares the deployed id with the running one", async () => {
    answerWith("same");
    await checkForNewVersion("same", 1_000_000);
    expect(isNewVersionAvailable()).toBe(false);

    resetNewVersionState();
    answerWith("newer");
    await checkForNewVersion("same", 1_000_000);
    expect(isNewVersionAvailable()).toBe(true);
  });

  it("asks at most once per interval", async () => {
    answerWith("same");
    const start = 1_000_000;

    await checkForNewVersion("same", start);
    await checkForNewVersion("same", start + VERSION_CHECK_INTERVAL_MS - 1);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    await checkForNewVersion("same", start + VERSION_CHECK_INTERVAL_MS);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("retries right away after a network failure, but not after a 404", async () => {
    fetchMock.mockRejectedValueOnce(new TypeError("offline"));
    await checkForNewVersion("same", 1_000_000);
    expect(isNewVersionAvailable()).toBe(false);

    fetchMock.mockResolvedValueOnce({ ok: false, json: async () => ({}) });
    await checkForNewVersion("same", 1_000_001);
    await checkForNewVersion("same", 1_000_002);

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(isNewVersionAvailable()).toBe(false);
  });

  it("ignores an answer that is not a build id", async () => {
    fetchMock.mockResolvedValue({ ok: true, json: async () => ({ x: 1 }) });
    await checkForNewVersion("same", 1_000_000);

    expect(isNewVersionAvailable()).toBe(false);
  });
});

describe("reloadIfNewVersionAvailable", () => {
  it("does nothing while the running build is current", () => {
    expect(reloadIfNewVersionAvailable()).toBe(false);
    expect(reload).not.toHaveBeenCalled();
  });

  it("reloads once and then holds back while the lock lasts", async () => {
    answerWith("newer");
    await checkForNewVersion("same", 1_000_000);

    expect(reloadIfNewVersionAvailable()).toBe(true);
    expect(reloadIfNewVersionAvailable()).toBe(false);
    expect(reload).toHaveBeenCalledTimes(1);
  });

  it("does not reload when sessionStorage is unusable", async () => {
    answerWith("newer");
    await checkForNewVersion("same", 1_000_000);
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });

    expect(reloadIfNewVersionAvailable()).toBe(false);
    expect(reload).not.toHaveBeenCalled();
  });
});

describe("installVersionCheck", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("stays off in development", () => {
    answerWith("newer");
    const remove = installVersionCheck("same");
    document.dispatchEvent(new Event("visibilitychange"));
    remove();

    expect(fetchMock).not.toHaveBeenCalled();
  });
});
