import { useConfigurationApi } from "./useConfigurationApi";
import { usePagesApi } from "./usePagesApi";
import { useProjectsApi } from "./useProjectsApi";
import { useProjectRolesApi } from "./useProjectRolesApi";
import { useAuthApi } from "./useAuthApi";
import { useCallback, useEffect } from "react";
import { useGlobalStore } from "@src/store/global.store";
import { selectAccessToken } from "@src/store/auth/auth.selectors";
import { axiosInstance } from "@api/axios/axios";
import { AxiosError } from "axios";
import { ErrorResponseDto } from "@models/error-response-dto.model";
import { initializationStoreActions } from "@src/store/initialization/initialization.actions";

interface UseInitializationOutput {
  initialize: () => Promise<void>;
}

export const useInitialization = (): UseInitializationOutput => {
  const { initialize: initializeConfiguration } = useConfigurationApi();
  const { initialize: initializeAuth, renewAccess, logout } = useAuthApi();
  const { initialize: initializePages } = usePagesApi();
  const { initialize: initializeProjects } = useProjectsApi();
  const { initialize: initializeProjectRoles } = useProjectRolesApi();

  const accessToken = useGlobalStore(selectAccessToken);

  // Add access token to all requests and handle token expiration globally
  useEffect(() => {
    if (!axiosInstance) {
      return;
    }

    axiosInstance.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, [accessToken]);

  const isRenewableRequest = (error: AxiosError<ErrorResponseDto>): boolean => {
    if (
      error?.config &&
      (error.config as unknown as { _retry?: boolean })._retry
    ) {
      return false;
    }

    console.log("isRenewableRequest", error);

    if (error?.response?.data?.errorcode === "access_token_expired") {
      return true;
    }

    // if (
    //   error?.response?.status === 400 &&
    //   (error?.response?.data as ErrorResponseDto)?.errorcode ===
    //     "access_token_invalid"
    // ) {
    //   return true;
    // }

    return false;
  };

  useEffect(() => {
    if (!axiosInstance) {
      return;
    }

    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        if (isRenewableRequest(error)) {
          // TODO Add additionals.can_renew === true
          originalRequest._retry = true;

          try {
            await renewAccess();
            const accessToken = useGlobalStore.getState().accessToken;
            originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
            return axiosInstance(originalRequest);
          } catch (err) {
            // TODO User Feedback
            await logout();
            return Promise.reject(err);
          }
        }

        return Promise.reject(error);
      }
    );
  }, [logout, renewAccess]);

  /**
   * Initializes the app and its parts
   */
  const initialize = useCallback(async () => {
    await initializeConfiguration();
    await initializeAuth();
    await initializePages();
    await initializeProjects();
    await initializeProjectRoles();

    initializationStoreActions.setPartInitialized("app");
  }, [
    initializeAuth,
    initializeConfiguration,
    initializePages,
    initializeProjectRoles,
    initializeProjects,
  ]);

  return {
    initialize,
  };
};
