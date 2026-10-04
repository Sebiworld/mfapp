import { useConfigurationApi } from "./useConfigurationApi";
import { usePagesApi } from "./usePagesApi";
import { useProjectsApi } from "./useProjectsApi";
import { useProjectRolesApi } from "./useProjectRolesApi";
import { useAuthApi } from "./useAuthApi";
import { usePerformancesApi } from "./usePerformancesApi";
import { useCallback, useEffect } from "react";
import { useGlobalStore } from "@src/store/global.store";
import {
  selectAccessToken,
  selectRefreshToken,
} from "@src/store/auth/auth.selectors";
import { axiosInstance } from "@api/axios/axios";
import { AxiosError, InternalAxiosRequestConfig } from "axios";
import { ErrorResponseDto } from "@models/error-response-dto.model";
import { initializationStoreActions } from "@src/store/initialization/initialization.actions";
import { prefetchNextPerformances } from "@api/prefetch/nextPerformancesPrefetch";
import { waitForPrefetch } from "./usePrefetchProjectData";

interface UseInitializationOutput {
  initialize: () => Promise<void>;
}

/** Path of the home page, whose next-performance card is loaded together with the app data. */
const HOME_PATH = "/";

interface PendingRenewal {
  /** Authorization header that was rejected and started this renewal. */
  fromAuthorization: string | undefined;
  promise: Promise<string | false>;
}

// Shared by all requests that fail with an expired access token at the same time: the refresh token may only be
// used once per renewal, so a second, parallel renewal would fail and end the session.
let pendingRenewal: PendingRenewal | null = null;

/**
 * Runs a token renewal, or joins the one that is already running.
 * Only requests rejected with the same credentials join: a request sent with other credentials while a renewal
 * runs (e.g. the user request inside the renewal, which already carries the new token) would otherwise wait
 * for itself and never end.
 * @param fromAuthorization Authorization header the failed request was sent with.
 * @param renew Function that renews the access token.
 * @returns The new access token, `false` when the renewal failed, or `null` when the request must not join the
 * running renewal.
 */
const renewAccessOnce = (
  fromAuthorization: string | undefined,
  renew: () => Promise<string | false>
): Promise<string | false> | null => {
  if (pendingRenewal) {
    return pendingRenewal.fromAuthorization === fromAuthorization
      ? pendingRenewal.promise
      : null;
  }

  const renewal: PendingRenewal = {
    fromAuthorization,
    promise: (async () => {
      try {
        return await renew();
      } finally {
        pendingRenewal = null;
      }
    })(),
  };

  pendingRenewal = renewal;

  return renewal.promise;
};

/** Methods that may be repeated without credentials once the session has ended: they only read. */
const GUEST_RETRY_METHODS = ["get"];

export const useInitialization = (): UseInitializationOutput => {
  const { initialize: initializeConfiguration } = useConfigurationApi();
  const { initialize: initializeAuth, renewAccess } = useAuthApi();
  const { initialize: initializePages } = usePagesApi();
  const { initialize: initializeProjects } = useProjectsApi();
  const { initialize: initializeProjectRoles } = useProjectRolesApi();
  const { loadNextPerformances } = usePerformancesApi();

  // Add access token to all requests and handle token expiration globally
  useEffect(() => {
    if (!axiosInstance) {
      return;
    }

    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig<unknown>) => {
        // Read at request time, so requests started right after a renewal already carry the new token.
        const accessToken = selectAccessToken(useGlobalStore.getState());

        // A request that brings its own credentials keeps them (the renewal sends the refresh token).
        if (accessToken && !config.headers.has("Authorization")) {
          config.headers.set("Authorization", `Bearer ${accessToken}`);
        }

        return config;
      },
      null,
      {
        synchronous: true,
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor); // remove if deps change
    };
  }, []);

  const isRenewableRequest = (error: AxiosError<ErrorResponseDto>): boolean => {
    if (
      error?.config &&
      (error.config as unknown as { _retry?: boolean })._retry
    ) {
      return false;
    }

    // console.log("isRenewableRequest", error);

    if (error?.response?.data?.errorcode === "access_token_expired") {
      return true;
    }

    if (
      error?.response?.status === 400 &&
      (error?.response?.data as ErrorResponseDto)?.errorcode ===
        "access_token_invalid"
    ) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (!axiosInstance) {
      return;
    }

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        if (isRenewableRequest(error)) {
          originalRequest._retry = true;

          const currentAccessToken = selectAccessToken(
            useGlobalStore.getState()
          );
          const currentAuthorization = currentAccessToken
            ? `Bearer ${currentAccessToken}`
            : undefined;
          const sentAuthorization = originalRequest.headers?.get?.(
            "Authorization"
          ) as string | undefined;

          // The session changed after this request was sent (a renewal finished or the session ended): repeat it
          // with the current credentials instead of renewing again with a refresh token that is no longer valid.
          if (sentAuthorization !== currentAuthorization) {
            if (currentAuthorization) {
              originalRequest.headers.set(
                "Authorization",
                currentAuthorization
              );

              return axiosInstance(originalRequest);
            }

            // Without a session only reading requests are repeated (as guest); a write must not be sent as guest.
            const method = String(
              originalRequest.method ?? "get"
            ).toLowerCase();

            if (GUEST_RETRY_METHODS.includes(method)) {
              originalRequest.headers.delete("Authorization");

              return axiosInstance(originalRequest);
            }

            return Promise.reject(error);
          }

          // A failed renewal resets the session itself (`renewAccess` -> `reset`), once for all waiting requests.
          const accessToken = await renewAccessOnce(sentAuthorization, () =>
            renewAccess(selectRefreshToken(useGlobalStore.getState()))
          );

          if (accessToken) {
            originalRequest.headers.set(
              "Authorization",
              `Bearer ${accessToken}`
            );

            return axiosInstance(originalRequest);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(responseInterceptor); // remove if deps change
    };
  }, [renewAccess]);

  /**
   * Initializes the app and its parts. The requests run in parallel: each one carries the stored access token
   * (request interceptor), and an expired token is renewed once for all of them (`renewAccessOnce`), after which
   * each failed request is repeated with the new token. So no part needs another part's answer first.
   * On the home page the next-performance card is loaded here too, so it is there when the splash screen goes; the
   * splash screen waits for it at most `PROJECT_DATA_MAX_WAIT_MS`.
   */
  const initialize = useCallback(async () => {
    const isHomePage = window.location.pathname === HOME_PATH;

    await Promise.all([
      initializeConfiguration(),
      initializeAuth(),
      initializePages(),
      initializeProjects(),
      initializeProjectRoles(),
      // Bounded: a hanging card request must not keep the splash screen; the card then loads on its own.
      isHomePage
        ? waitForPrefetch([prefetchNextPerformances(loadNextPerformances)])
        : null,
    ]);

    initializationStoreActions.setPartInitialized("app");
  }, [
    initializeAuth,
    initializeConfiguration,
    initializePages,
    initializeProjectRoles,
    initializeProjects,
    loadNextPerformances,
  ]);

  return {
    initialize,
  };
};

/**
 * Runs the app initialization once when the app starts. `initialize` keeps its identity for the whole visit, so a
 * user or token stored by the initialization itself (or by a later renewal) does not start it again.
 */
export const useInitializeApp = (): void => {
  const { initialize } = useInitialization();

  useEffect(() => {
    void initialize();
  }, [initialize]);
};
