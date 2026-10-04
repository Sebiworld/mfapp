import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { FC } from "react";
import { resetNewVersionState } from "@utils/functions/newVersionReload";
import { useReloadOnNewVersion } from "../useReloadOnNewVersion";

const reload = vi.fn();
const fetchMock = vi.fn();
let router: ReturnType<typeof createMemoryRouter>;

const Probe: FC = () => {
  useReloadOnNewVersion();

  return null;
};

const answerWith = (buildId: string): void => {
  fetchMock.mockResolvedValue({ ok: true, json: async () => ({ buildId }) });
};

const showTab = async (): Promise<void> => {
  Object.defineProperty(document, "visibilityState", {
    configurable: true,
    get: () => "visible",
  });
  await act(async () => {
    document.dispatchEvent(new Event("visibilitychange"));
  });
};

const go = async (to: string): Promise<void> => {
  await act(async () => {
    await router.navigate(to);
  });
};

beforeEach(() => {
  reload.mockClear();
  fetchMock.mockReset();
  sessionStorage.clear();
  resetNewVersionState();
  vi.stubEnv("DEV", false);
  vi.stubGlobal("fetch", fetchMock);
  Object.defineProperty(window, "location", {
    configurable: true,
    value: { ...window.location, reload },
  });
  router = createMemoryRouter([{ path: "*", element: <Probe /> }], {
    initialEntries: ["/"],
  });
  render(<RouterProvider router={router} />);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  // @ts-expect-error restores the jsdom default.
  delete document.visibilityState;
});

describe("useReloadOnNewVersion", () => {
  it("asks for version.json without caching when the tab becomes visible", async () => {
    answerWith("test-build");

    await showTab();

    expect(fetchMock).toHaveBeenCalledWith("/version.json", {
      cache: "no-store",
    });
  });

  it("does not reload for the same build, also not on a page change", async () => {
    answerWith("test-build");

    await showTab();
    await go("/a");

    expect(reload).not.toHaveBeenCalled();
  });

  it("does not reload when the deployed build differs, only at the next page change", async () => {
    answerWith("other-build");

    await showTab();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(reload).not.toHaveBeenCalled();

    await go("/a");

    expect(reload).toHaveBeenCalledTimes(1);
  });

  it("does not reload twice within the lock time, even with a stale cache", async () => {
    answerWith("other-build");

    await showTab();
    await go("/a");
    await go("/b");

    expect(reload).toHaveBeenCalledTimes(1);
  });

  it("ignores a network failure and a missing file silently", async () => {
    fetchMock.mockRejectedValueOnce(new TypeError("offline"));
    await showTab();
    await go("/a");

    fetchMock.mockResolvedValue({ ok: false, json: async () => ({}) });
    await showTab();
    await go("/b");

    expect(reload).not.toHaveBeenCalled();
  });
});
