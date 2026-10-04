import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import {
  AxiosAdapter,
  AxiosError,
  AxiosHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { axiosInstance } from "@api/axios/axios";
import { useGlobalStore } from "@src/store/global.store";
import { authStoreActions } from "@src/store/auth/auth.actions";
import {
  clearNextPerformancesPrefetch,
  getNextPerformancesPrefetch,
} from "@api/prefetch/nextPerformancesPrefetch";
import { PROJECT_DATA_MAX_WAIT_MS } from "../usePrefetchProjectData";
import { initializationStoreActions } from "@src/store/initialization/initialization.actions";
import { useInitializeApp, useInitialization } from "../useInitialization";

vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

const t = (key: string): string => key;

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t }),
}));

interface LoggedRequest {
  method: string;
  url: string;
  authorization: string | undefined;
}

const EXPIRED = "expired-access";
const FRESH = "fresh-access";
const REFRESH = "refresh-1";

let requests: LoggedRequest[] = [];
// While set, every request waits for it, so the test can see which requests were started together.
let gate: Promise<void> | null = null;
let openGate: () => void = () => undefined;

const closeGate = (): void => {
  gate = new Promise((resolve) => {
    openGate = resolve;
  });
};

// While set, the first projects request waits for it: its answer then arrives after the renewal has finished.
let projectsHold: Promise<void> | null = null;
let releaseProjects: () => void = () => undefined;

// While set, the first request to this URL waits until the test releases it.
let urlHold: { url: string; promise: Promise<void> } | null = null;
let releaseUrl: () => void = () => undefined;

/**
 * Holds the next request to a URL until `releaseUrl` is called.
 * @param url Request URL as the API object sends it.
 */
const holdUrl = (url: string): void => {
  urlHold = {
    url,
    promise: new Promise((resolve) => {
      releaseUrl = resolve;
    }),
  };
};

// When set, the backend also rejects the freshly renewed token for the user request.
let rejectRenewedUser = false;

/**
 * Builds the response (or the error axios would throw for it) for a request config.
 * @param config Request config.
 * @param status HTTP status.
 * @param data Response body.
 * @returns The response for 2xx; throws an `AxiosError` otherwise.
 */
const respond = (
  config: InternalAxiosRequestConfig,
  status: number,
  data: unknown
): AxiosResponse => {
  const response: AxiosResponse = {
    status,
    statusText: "",
    // Raw body like a real adapter delivers it; the request's own transformResponse parses it.
    data: JSON.stringify(data),
    headers: {},
    config,
  };

  if (status >= 400) {
    throw new AxiosError(
      `Request failed with status code ${status}`,
      AxiosError.ERR_BAD_REQUEST,
      config,
      {},
      response
    );
  }

  return response;
};

/** Fake backend: rejects the expired token like AppApi does and renews it once per refresh token. */
const adapter: AxiosAdapter = async (config) => {
  const method = (config.method ?? "get").toUpperCase();
  const url = config.url ?? "";
  const authorization = AxiosHeaders.from(config.headers).get(
    "Authorization"
  ) as string | undefined;

  requests.push({ method, url, authorization });

  if (gate) {
    await gate;
  }

  if (urlHold && urlHold.url === url) {
    const hold = urlHold.promise;
    urlHold = null;
    await hold;
  }

  if (url === "/projects" && projectsHold) {
    const hold = projectsHold;
    projectsHold = null;
    await hold;
  }

  if (url === "/auth/access") {
    // The refresh token is rotated on every renewal, so a second renewal with the same token fails.
    const renewals = requests.filter(
      (request) => request.url === "/auth/access"
    );

    return renewals.length === 1 && authorization === `Bearer ${REFRESH}`
      ? respond(config, 200, {
          access_token: FRESH,
          refresh_token: "refresh-2",
        })
      : respond(config, 400, { errorcode: "invalid_token" });
  }

  if (
    authorization === `Bearer ${EXPIRED}` ||
    (rejectRenewedUser &&
      url === "/auth" &&
      authorization === `Bearer ${FRESH}`)
  ) {
    return respond(config, 401, { errorcode: "access_token_expired" });
  }

  const isLoggedIn = authorization === `Bearer ${FRESH}`;

  switch (url) {
    case "/configuration":
      return respond(config, 200, { maintenance_mode: false });
    case "/menues":
      return respond(config, 200, { main: [] });
    case "/auth":
      return method === "GET"
        ? respond(config, 200, {
            id: isLoggedIn ? "7" : "40",
            name: isLoggedIn ? "member" : "guest",
            isLoggedIn,
            hash: isLoggedIn ? "user-hash" : "guest-hash",
          })
        : respond(config, 200, { success: true });
    case "/projects":
      return respond(config, 200, {
        projects: {},
        hash: isLoggedIn ? "member-projects" : "guest-projects",
      });
    case "/performances/next":
      return respond(config, 200, { current: null, next: null, hash: "h" });
    default:
      return respond(config, 404, {});
  }
};

const countOf = (method: string, url: string): number =>
  requests.filter((request) => request.method === method && request.url === url)
    .length;

describe("useInitialization", () => {
  const originalAdapter = axiosInstance.defaults.adapter;

  beforeEach(() => {
    requests = [];
    gate = null;
    projectsHold = null;
    urlHold = null;
    rejectRenewedUser = false;
    axiosInstance.defaults.adapter = adapter;
    clearNextPerformancesPrefetch();
    authStoreActions.resetSlice();
    useGlobalStore.setState({ projectsHash: undefined });
    window.history.replaceState(null, "", "/");
  });

  afterEach(() => {
    openGate();
    releaseProjects();
    releaseUrl();
    axiosInstance.defaults.adapter = originalAdapter;
  });

  it("starts configuration, menus, user, projects and the home card together", async () => {
    closeGate();
    const { result } = renderHook(() => useInitialization());

    const done = result.current.initialize();

    await waitFor(() => expect(requests).toHaveLength(5));
    expect(requests.map((request) => request.url).sort()).toEqual([
      "/auth",
      "/configuration",
      "/menues",
      "/performances/next",
      "/projects",
    ]);

    openGate();
    await done;

    expect(useGlobalStore.getState().intializedParts.app).toBe(true);
  });

  it("loads the next-performance card only on the home page", async () => {
    window.history.replaceState(null, "", "/projekte/annie/");
    const { result } = renderHook(() => useInitialization());

    await result.current.initialize();

    expect(countOf("GET", "/performances/next")).toBe(0);
    expect(getNextPerformancesPrefetch()).toBeNull();
  });

  it("ends the initialization after the longest wait when the card request hangs", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    holdUrl("/performances/next");
    const { result } = renderHook(() => useInitialization());

    let isDone = false;
    const done = result.current.initialize().then(() => {
      isDone = true;
    });

    await vi.advanceTimersByTimeAsync(PROJECT_DATA_MAX_WAIT_MS - 100);
    expect(isDone).toBe(false);

    await vi.advanceTimersByTimeAsync(100);
    await done;
    expect(useGlobalStore.getState().intializedParts.app).toBe(true);

    releaseUrl();
    vi.useRealTimers();
  });

  it("hands the card's answer over once the initialization is done", async () => {
    const { result } = renderHook(() => useInitialization());

    await result.current.initialize();

    expect(getNextPerformancesPrefetch()?.result).toEqual({
      current: null,
      next: null,
      hash: "h",
    });
  });

  describe("with an expired access token", () => {
    beforeEach(() => {
      useGlobalStore.setState({ accessToken: EXPIRED, refreshToken: REFRESH });
    });

    it("renews it once for all parallel requests and stays logged in", async () => {
      closeGate();
      const { result } = renderHook(() => useInitialization());

      const done = result.current.initialize();

      // All requests are on their way with the expired token before the first answer arrives.
      await waitFor(() => expect(requests).toHaveLength(5));
      openGate();
      await done;

      expect(countOf("POST", "/auth/access")).toBe(1);
      expect(countOf("DELETE", "/auth")).toBe(0);
      expect(useGlobalStore.getState().accessToken).toBe(FRESH);
      expect(useGlobalStore.getState().user?.isLoggedIn).toBe(true);
    });

    it("does not renew again for an answer that arrives after the renewal", async () => {
      projectsHold = new Promise((resolve) => {
        releaseProjects = resolve;
      });
      const { result } = renderHook(() => useInitialization());

      const done = result.current.initialize();

      await waitFor(() =>
        expect(useGlobalStore.getState().user?.isLoggedIn).toBe(true)
      );
      releaseProjects();
      await done;

      expect(countOf("POST", "/auth/access")).toBe(1);
      expect(useGlobalStore.getState().accessToken).toBe(FRESH);
      expect(useGlobalStore.getState().projectsHash).toBe("member-projects");
    });

    it("sends the refresh token, not the expired access token, to renew", async () => {
      const { result } = renderHook(() => useInitialization());

      await result.current.initialize();

      const renewal = requests.find(
        (request) => request.url === "/auth/access"
      );
      expect(renewal?.authorization).toBe(`Bearer ${REFRESH}`);
    });

    it("loads the projects as the logged-in member, not as a guest", async () => {
      const { result } = renderHook(() => useInitialization());

      await result.current.initialize();

      const projectRequests = requests.filter(
        (request) => request.url === "/projects"
      );
      expect(projectRequests.at(-1)?.authorization).toBe(`Bearer ${FRESH}`);
      expect(projectRequests.every((request) => !!request.authorization)).toBe(
        true
      );
      expect(useGlobalStore.getState().projectsHash).toBe("member-projects");
    });

    it("rejects the waiting requests and resets the session once when the renewal fails", async () => {
      useGlobalStore.setState({ refreshToken: "refresh-outdated" });
      const resetApp = vi.spyOn(initializationStoreActions, "resetApp");
      closeGate();
      const { result } = renderHook(() => useInitialization());

      const done = result.current.initialize();
      const ownRequest = axiosInstance.get("/menues");
      await waitFor(() => expect(requests).toHaveLength(6));
      openGate();

      await expect(ownRequest).rejects.toMatchObject({
        response: { status: 401 },
      });
      await done;

      expect(countOf("POST", "/auth/access")).toBe(1);
      expect(resetApp).toHaveBeenCalledTimes(1);
      expect(useGlobalStore.getState().accessToken).toBeUndefined();
      expect(useGlobalStore.getState().intializedParts.app).toBe(true);
    });

    it("ends the user request inside the renewal when the new token is rejected too", async () => {
      rejectRenewedUser = true;
      const { result } = renderHook(() => useInitialization());

      const outcome = await Promise.race([
        result.current.initialize().then(() => "done"),
        new Promise((resolve) => setTimeout(() => resolve("hanging"), 2000)),
      ]);

      expect(outcome).toBe("done");
      expect(countOf("POST", "/auth/access")).toBe(1);
    });
  });

  describe("after the session ended while a request was on its way", () => {
    /**
     * Sends a request with the expired token, ends the session while it waits and lets the 401 arrive then.
     * @param send Function that sends the request.
     * @param url URL of the request.
     * @returns The settled request.
     */
    const sendAcrossSessionEnd = async (
      send: () => Promise<unknown>,
      url: string
    ): Promise<PromiseSettledResult<unknown>> => {
      useGlobalStore.setState({ accessToken: EXPIRED, refreshToken: REFRESH });
      renderHook(() => useInitialization());
      holdUrl(url);

      const request = Promise.allSettled([send()]);
      await waitFor(() => expect(requests).toHaveLength(1));
      authStoreActions.resetSlice();
      releaseUrl();

      return (await request)[0];
    };

    it("repeats a reading request as guest", async () => {
      const outcome = await sendAcrossSessionEnd(
        () => axiosInstance.get("/configuration"),
        "/configuration"
      );

      expect(outcome.status).toBe("fulfilled");
      expect(requests.map((request) => request.authorization)).toEqual([
        `Bearer ${EXPIRED}`,
        undefined,
      ]);
    });

    it("does not repeat a writing request as guest but hands back the error", async () => {
      const outcome = await sendAcrossSessionEnd(
        () => axiosInstance.post("/configuration", {}),
        "/configuration"
      );

      expect(outcome.status).toBe("rejected");
      expect((outcome as PromiseRejectedResult).reason?.response?.status).toBe(
        401
      );
      expect(requests).toHaveLength(1);
    });
  });

  describe("when the app starts", () => {
    /**
     * Starts the app like `App` does and waits until it is initialized and no further request follows.
     */
    const startApp = async (): Promise<void> => {
      useGlobalStore.setState((state) => {
        state.intializedParts.app = false;
        return state;
      });

      renderHook(() => useInitializeApp());

      await waitFor(() =>
        expect(useGlobalStore.getState().intializedParts.app).toBe(true)
      );
      // Room for a second run, which would start right after the user or the token was stored.
      await new Promise((resolve) => setTimeout(resolve, 50));
    };

    it("initializes once on a first visit, although the user is stored meanwhile", async () => {
      await startApp();

      expect(useGlobalStore.getState().user?.hash).toBe("guest-hash");
      expect(countOf("GET", "/configuration")).toBe(1);
      expect(countOf("GET", "/menues")).toBe(1);
      expect(countOf("GET", "/auth")).toBe(1);
      expect(countOf("GET", "/projects")).toBe(1);
      expect(countOf("GET", "/performances/next")).toBe(1);
    });

    it("initializes once when the access token is renewed during the start", async () => {
      useGlobalStore.setState({ accessToken: EXPIRED, refreshToken: REFRESH });

      await startApp();

      expect(useGlobalStore.getState().accessToken).toBe(FRESH);
      expect(countOf("POST", "/auth/access")).toBe(1);
      // Each part once with the expired token and once repeated with the new one, nothing more.
      for (const url of ["/configuration", "/menues", "/projects"]) {
        expect(
          requests
            .filter((request) => request.url === url)
            .map((request) => request.authorization)
        ).toEqual([`Bearer ${EXPIRED}`, `Bearer ${FRESH}`]);
      }
    });
  });
});
