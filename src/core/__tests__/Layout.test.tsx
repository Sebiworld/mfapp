import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, renderHook, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { useState } from "react";
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
import { selectCurrentUser } from "@src/store/auth/auth.selectors";
import { useAuthApi } from "@api/hooks/useAuthApi";
import {
  useInitializeApp,
  useInitialization,
} from "@api/hooks/useInitialization";
import { initializationStoreActions } from "@src/store/initialization/initialization.actions";
import {
  clearNextPerformancesPrefetch,
  getNextPerformancesPrefetch,
  loadSharedNextPerformances,
} from "@api/prefetch/nextPerformancesPrefetch";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { Page } from "@pages/page/Page";
import { Layout } from "../Layout";
import "@utils/i18n/i18n";

vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
  ToastContainer: () => null,
}));

// Mounts per component instance, to tell a re-render from a new mount.
const mounts = vi.hoisted(() => ({ header: 0, content: 0 }));

// The header stands in for every part with own state (menu, login dialog): it remembers the user it was
// mounted with, like a component that copied account data into its state.
vi.mock("../header/Header", () => ({
  Header: () => {
    const [mountedWith] = useState(() => {
      mounts.header += 1;
      return selectCurrentUser(useGlobalStore.getState())?.name ?? "guest";
    });

    return <div data-testid="header">{`header:${mountedWith}`}</div>;
  },
}));

vi.mock("../footer/Footer", () => ({ Footer: () => null }));

const ACCOUNT_A = { id: "7", name: "member-a", hash: "hash-a" };
const ACCOUNT_B = { id: "8", name: "member-b", hash: "hash-b" };
const GUEST = { id: "40", name: "guest", hash: "hash-guest" };

interface LoggedRequest {
  method: string;
  url: string;
  authorization: string | undefined;
}

let requests: LoggedRequest[] = [];

// While set, the next user request of account A waits until the test releases it.
let holdAuthOfA: Promise<void> | null = null;
let releaseAuthOfA: () => void = () => undefined;

// While set, the next member page request of account A waits until the test releases it.
let holdPageOfA: Promise<void> | null = null;
let releasePageOfA: () => void = () => undefined;

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

/**
 * Returns the account a request was sent for.
 * @param authorization Authorization header of the request.
 * @returns The account, or the guest without a valid token.
 */
const accountOf = (
  authorization: string | undefined
): { account: typeof GUEST; isLoggedIn: boolean } => {
  if (authorization === "Bearer access-a") {
    return { account: ACCOUNT_A, isLoggedIn: true };
  }

  if (authorization === "Bearer access-b") {
    return { account: ACCOUNT_B, isLoggedIn: true };
  }

  return { account: GUEST, isLoggedIn: false };
};

/** Fake backend: answers depend on the account of the access token, like member pages do. */
const adapter: AxiosAdapter = async (config) => {
  const method = (config.method ?? "get").toUpperCase();
  const url = config.url ?? "";
  const authorization = AxiosHeaders.from(config.headers).get(
    "Authorization"
  ) as string | undefined;

  requests.push({ method, url, authorization });

  const { account, isLoggedIn } = accountOf(authorization);

  if (url === "/tpage/intern/" && account === ACCOUNT_A && holdPageOfA) {
    const hold = holdPageOfA;
    holdPageOfA = null;
    await hold;
  }

  if (url === "/auth" && method === "GET" && account === ACCOUNT_A && holdAuthOfA) {
    const hold = holdAuthOfA;
    holdAuthOfA = null;
    await hold;
  }

  if (url === "/auth" && method === "POST") {
    return respond(config, 200, { refresh_token: "refresh-b" });
  }

  if (url === "/auth/access") {
    return authorization === "Bearer refresh-b"
      ? respond(config, 200, {
          access_token: "access-b",
          refresh_token: "refresh-b2",
        })
      : respond(config, 400, { errorcode: "invalid_token" });
  }

  switch (url) {
    case "/auth":
      if (method !== "GET") {
        return respond(config, 200, { success: true });
      }

      // Like the backend: an unchanged user is answered with 204.
      if (config.params?.hash === account.hash) {
        return respond(config, 204, "");
      }

      return respond(config, 200, { ...account, isLoggedIn });
    case "/configuration":
      return respond(config, 200, { maintenance_mode: false });
    case "/menues":
      return respond(config, 200, { main_navigation: [] });
    case "/projects":
      return respond(config, 200, { projects: {}, hash: account.hash });
    case "/tpage/intern/":
      return respond(config, 200, {
        id: 100,
        name: "intern",
        template: { name: "basic_page" },
        title: isLoggedIn
          ? `Mitglieder-Info für ${account.name}`
          : "Bitte anmelden",
      });
    default:
      return respond(config, 404, {});
  }
};

/**
 * Renders the layout with the page route.
 * @param path Path to open.
 * @param startApp `true` also runs the app initialization like `App` does.
 */
const renderLayout = (path: string, startApp = false): void => {
  // Installs the interceptor that sends the stored access token.
  renderHook(() => (startApp ? useInitializeApp() : useInitialization()));

  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <Layout />,
        children: [{ path: "*", element: <Page /> }],
      },
    ],
    { initialEntries: [path] }
  );

  render(
    <ThemeProvider theme={{ [THEME_ID]: mfTheme }}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

/** Stores a logged-in session of account A with data that only A may see. */
const storeSessionOfAccountA = async (): Promise<void> => {
  useGlobalStore.setState((state) => {
    state.accessToken = "access-a";
    state.refreshToken = "refresh-a";
    state.user = { ...ACCOUNT_A, isLoggedIn: true };
    state.roles = { 5: { id: 5, hash: "roles-a" } as never };
    state.projectDetails = { 3: { id: 3, hash: "details-a" } as never };
    state.pageCards = { 9: { id: 9, title: "Probenplan A" } as never };
    return state;
  });

  await loadSharedNextPerformances(async () => ({
    current: null,
    next: null,
    hash: "next-a",
  }));
};

describe("Layout: session changes", () => {
  const originalAdapter = axiosInstance.defaults.adapter;

  beforeEach(() => {
    requests = [];
    holdPageOfA = null;
    holdAuthOfA = null;
    mounts.header = 0;
    mounts.content = 0;
    axiosInstance.defaults.adapter = adapter;
    clearNextPerformancesPrefetch();
    useGlobalStore.setState((state) => {
      state.accessToken = undefined;
      state.refreshToken = undefined;
      state.user = undefined;
      state.pages = {};
      state.pageCards = {};
      state.roles = {};
      state.projectDetails = {};
      return state;
    });
  });

  afterEach(() => {
    releasePageOfA();
    releaseAuthOfA();
    vi.restoreAllMocks();
    axiosInstance.defaults.adapter = originalAdapter;
  });

  it("keeps header and page when the first visit learns the guest user", async () => {
    renderLayout("/intern/");
    await screen.findByText("Bitte anmelden");

    act(() => {
      authStoreActions.setUser({ ...GUEST, isLoggedIn: false });
    });

    expect(mounts.header).toBe(1);
    expect(
      requests.filter((request) => request.url === "/tpage/intern/")
    ).toHaveLength(1);
  });

  it("shows and keeps nothing of account A after logout, and loads as account B after login", async () => {
    await storeSessionOfAccountA();
    renderLayout("/intern/");
    await screen.findByText("Mitglieder-Info für member-a");
    expect(screen.getByTestId("header")).toHaveTextContent("header:member-a");

    const { result } = renderHook(() => useAuthApi());

    await act(async () => {
      await result.current.logout();
    });

    await screen.findByText("Bitte anmelden");
    expect(screen.queryByText(/member-a/)).toBeNull();
    expect(screen.getByTestId("header")).toHaveTextContent("header:guest");

    const afterLogout = useGlobalStore.getState();
    expect(afterLogout.user).toBeUndefined();
    expect(afterLogout.accessToken).toBeUndefined();
    expect(afterLogout.refreshToken).toBeUndefined();
    expect(afterLogout.roles).toEqual({});
    expect(afterLogout.projectDetails).toEqual({});
    expect(afterLogout.pageCards).toEqual({});
    expect(JSON.stringify(afterLogout.pages)).not.toContain("member-a");
    expect(getNextPerformancesPrefetch()).toBeNull();
    // The page was loaded again as guest.
    expect(
      requests.filter((request) => request.url === "/tpage/intern/").at(-1)
        ?.authorization
    ).toBeUndefined();

    await act(async () => {
      await result.current.login("b@example.org", "secret");
    });

    await screen.findByText("Mitglieder-Info für member-b");
    expect(screen.queryByText(/member-a/)).toBeNull();
    expect(screen.queryByText("Bitte anmelden")).toBeNull();
    expect(screen.getByTestId("header")).toHaveTextContent("header:member-b");
    expect(useGlobalStore.getState().user?.name).toBe("member-b");
  });

  it("shows nothing of account A after logging out as guest, also in the persisted store", async () => {
    await storeSessionOfAccountA();
    renderLayout("/intern/");
    await screen.findByText("Mitglieder-Info für member-a");

    const { result } = renderHook(() => useAuthApi());

    await act(async () => {
      await result.current.logout();
    });

    await screen.findByText("Bitte anmelden");
    expect(screen.queryByText(/member-a/)).toBeNull();

    const persisted = localStorage.getItem("mfStore") ?? "";
    expect(persisted).not.toContain("member-a");
    expect(persisted).not.toContain("access-a");
    expect(persisted).not.toContain("Probenplan A");
    expect(persisted).not.toContain("roles-a");
  });

  it("drops an answer for account A that arrives after the logout", async () => {
    await storeSessionOfAccountA();
    holdPageOfA = new Promise((resolve) => {
      releasePageOfA = resolve;
    });
    renderLayout("/intern/");
    await vi.waitFor(() =>
      expect(
        requests.filter((request) => request.url === "/tpage/intern/")
      ).toHaveLength(1)
    );

    const { result } = renderHook(() => useAuthApi());

    await act(async () => {
      await result.current.logout();
    });
    await screen.findByText("Bitte anmelden");

    await act(async () => {
      releasePageOfA();
      await new Promise((resolve) => setTimeout(resolve, 20));
    });

    expect(screen.queryByText(/member-a/)).toBeNull();
    expect(screen.getByText("Bitte anmelden")).toBeInTheDocument();
    expect(JSON.stringify(useGlobalStore.getState().pages)).not.toContain(
      "member-a"
    );
  });

  it("late /auth after logout leaves the store as guest", async () => {
    await storeSessionOfAccountA();
    // Changed data of A: the backend answers 200 with the user instead of 204.
    useGlobalStore.setState((state) => {
      state.user = { ...ACCOUNT_A, hash: "hash-a-old", isLoggedIn: true };
      return state;
    });
    holdAuthOfA = new Promise((resolve) => {
      releaseAuthOfA = resolve;
    });
    renderLayout("/intern/");
    await screen.findByText("Mitglieder-Info für member-a");

    const { result } = renderHook(() => useAuthApi());
    const lateUser = result.current.loadUser();
    await vi.waitFor(() =>
      expect(
        requests.filter(
          (request) => request.method === "GET" && request.url === "/auth"
        )
      ).toHaveLength(1)
    );

    await act(async () => {
      await result.current.logout();
    });
    await screen.findByText("Bitte anmelden");

    await act(async () => {
      releaseAuthOfA();
      await lateUser;
    });

    expect(useGlobalStore.getState().user).toBeUndefined();
    expect(screen.getByTestId("header")).toHaveTextContent("header:guest");
    expect(localStorage.getItem("mfStore") ?? "").not.toContain("member-a");
  });

  describe("when the stored account and the account of the token differ", () => {
    /**
     * Counts the requests sent to a URL with a method.
     * @param method HTTP method.
     * @param url Request URL.
     * @returns Number of requests.
     */
    const countOf = (method: string, url: string): number =>
      requests.filter(
        (request) => request.method === method && request.url === url
      ).length;

    /** Waits until the app is initialized and no further request follows. */
    const settle = async (): Promise<void> => {
      await vi.waitFor(() =>
        expect(useGlobalStore.getState().intializedParts.app).toBe(true)
      );
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 50));
      });
    };

    beforeEach(() => {
      useGlobalStore.setState((state) => {
        state.intializedParts.app = false;
        return state;
      });
    });

    it("starts a new session for account B and keeps nothing of account A", async () => {
      await storeSessionOfAccountA();
      // Another tab logged in as B meanwhile; the stored user is still A.
      useGlobalStore.setState({
        accessToken: "access-b",
        refreshToken: "refresh-b2",
      });
      const resetApp = vi.spyOn(initializationStoreActions, "resetApp");

      renderLayout("/intern/", true);

      await vi.waitFor(() =>
        expect(screen.getByTestId("header")).toHaveTextContent(
          "header:member-b"
        )
      );
      await screen.findByText("Mitglieder-Info für member-b");
      await settle();

      expect(resetApp).toHaveBeenCalledTimes(1);
      expect(resetApp).toHaveBeenCalledWith(false);
      expect(screen.queryByText(/member-a/)).toBeNull();

      const state = useGlobalStore.getState();
      expect(state.user?.id).toBe(ACCOUNT_B.id);
      expect(state.accessToken).toBe("access-b");
      expect(JSON.stringify(state.roles)).not.toContain("roles-a");
      expect(JSON.stringify(state.projectDetails)).not.toContain("details-a");
      expect(JSON.stringify(state.pageCards)).not.toContain("Probenplan A");
      expect(JSON.stringify(state.pages)).not.toContain("member-a");
      expect(getNextPerformancesPrefetch()).toBeNull();
      // No reset loop: the user was asked once.
      expect(countOf("GET", "/auth")).toBe(1);
    });

    it("keeps the session when the token answers with the stored account", async () => {
      await storeSessionOfAccountA();
      // Same account with changed data: answered with 200, not 204.
      useGlobalStore.setState((state) => {
        state.user = { ...ACCOUNT_A, hash: "hash-a-old", isLoggedIn: true };
        return state;
      });
      const resetApp = vi.spyOn(initializationStoreActions, "resetApp");

      renderLayout("/intern/", true);
      await screen.findByText("Mitglieder-Info für member-a");
      await settle();

      expect(resetApp).not.toHaveBeenCalled();
      expect(mounts.header).toBe(1);
      expect(useGlobalStore.getState().user?.hash).toBe(ACCOUNT_A.hash);
      expect(countOf("GET", "/configuration")).toBe(1);
      expect(countOf("GET", "/projects")).toBe(1);
      expect(countOf("GET", "/tpage/intern/")).toBe(1);
    });

    it("treats a guest who learns its user on the first visit as no change", async () => {
      const resetApp = vi.spyOn(initializationStoreActions, "resetApp");

      renderLayout("/intern/", true);
      await screen.findByText("Bitte anmelden");
      await settle();

      expect(resetApp).not.toHaveBeenCalled();
      expect(mounts.header).toBe(1);
      expect(useGlobalStore.getState().user?.id).toBe(GUEST.id);
      expect(countOf("GET", "/auth")).toBe(1);
      expect(countOf("GET", "/configuration")).toBe(1);
      expect(countOf("GET", "/tpage/intern/")).toBe(1);
    });

    it("logs a guest in with one new session and one round of start requests", async () => {
      renderLayout("/intern/", true);
      await screen.findByText("Bitte anmelden");
      await settle();
      const resetApp = vi.spyOn(initializationStoreActions, "resetApp");
      const before = requests.length;

      const { result } = renderHook(() => useAuthApi());
      let loggedIn = false;
      await act(async () => {
        loggedIn = await result.current.login("b@example.org", "secret");
      });
      await screen.findByText("Mitglieder-Info für member-b");
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 50));
      });

      expect(loggedIn).toBe(true);
      expect(resetApp).toHaveBeenCalledTimes(1);
      expect(mounts.header).toBe(2);
      expect(screen.getByTestId("header")).toHaveTextContent("header:member-b");

      const afterLogin = requests.slice(before);
      const count = (method: string, url: string): number =>
        afterLogin.filter(
          (request) => request.method === method && request.url === url
        ).length;
      expect(count("GET", "/configuration")).toBe(1);
      expect(count("GET", "/projects")).toBe(1);
      expect(count("GET", "/tpage/intern/")).toBe(1);
      // One user request inside the renewal, one after the login's reset.
      expect(count("GET", "/auth")).toBe(2);
    });
  });
});
