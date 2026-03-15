import { MFApi } from "@api/axios/mfApi";
import { UserDto } from "@models/user-dto.model";
import { authStoreActions } from "@src/store/auth/auth.actions";
import {
  selectAccessToken,
  selectCurrentUser,
  selectRefreshToken,
  selectUserHash,
} from "@src/store/auth/auth.selectors";
import { selectConfigurationParams } from "@src/store/configuration/configuration.selectors";
import { useGlobalStore } from "@src/store/global.store";
import { initializationStoreActions } from "@src/store/initialization/initialization.actions";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import axios from "axios";
import { useReset } from "./useReset";
import { sleep } from "@utils/functions/sleep";

interface UseAuthApiOutput {
  loadUser: () => Promise<UserDto | true | Error>;
  renewAccess: () => Promise<string | false>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  registration: (
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    birthdate: number,
    nickname?: string,
    rolestext?: string
  ) => Promise<boolean>;
  registrationConfirm: (token: string) => Promise<boolean>;
  initialize: () => Promise<void>;
}

export const useAuthApi = (): UseAuthApiOutput => {
  const { t } = useTranslation();

  const userHash = useGlobalStore(selectUserHash);
  const config = useGlobalStore(selectConfigurationParams);
  const refreshTokenFromStore = useGlobalStore(selectRefreshToken);
  const accessTokenFromStore = useGlobalStore(selectAccessToken);
  const user = useGlobalStore(selectCurrentUser);

  const { reset } = useReset();

  const loadUser = useCallback(async (): Promise<UserDto | true | Error> => {
    try {
      const params: { [key: string]: unknown } = {};
      const hash = userHash;
      if (hash) {
        params.hash = hash;
      }

      const response = await MFApi.getCurrentUser(params);

      if (response.status === 204) {
        return true;
      }

      if (!response.data?.id) {
        throw new Error("No valid user object found");
      }

      authStoreActions.setUser(response.data);

      return response.data ?? true;
    } catch (error) {
      console.error("Error in data fetch:", error);
      return error as Error;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userHash, accessTokenFromStore]);

  const renewAccess = useCallback(
    async (refreshToken?: string) => {
      try {
        const refreshTokenForCall = refreshToken || refreshTokenFromStore;
        if (!refreshTokenForCall || typeof refreshTokenForCall !== "string") {
          throw new Error("No refresh token found");
        }

        const response = await MFApi.loginAccess(refreshTokenForCall);
        if (!response.data?.access_token) {
          throw new Error("No valid access token retrieved");
        }

        authStoreActions.setAccessToken(
          response.data.access_token,
          response.data.refresh_token
        );
        await sleep(10);

        await loadUser();

        return response.data.access_token;
      } catch (error) {
        console.error("Error while trying to renew access: ", error);

        await reset();
      }

      return false;
    },
    [loadUser, refreshTokenFromStore, reset]
  );

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      if (config?.disable_login) {
        toast.error(t("auth.login-disabled"));
        return false;
      }

      try {
        const response = await MFApi.login(email, password);

        if (!response.data?.refresh_token) {
          throw new Error("No valid refresh token retrieved.");
        }

        await renewAccess(response?.data?.refresh_token);

        await reset(false);

        const loadedUser = (await loadUser()) as UserDto;
        if (!loadedUser?.id) {
          throw new Error("No valid user object found after login.");
        }

        toast.success(
          t("auth.login-successful", {
            name: loadedUser?.nickname || loadedUser?.name,
          })
        );

        return true;
      } catch (error) {
        console.error("Error while trying to login: ", error);

        await reset();

        if (axios.isAxiosError(error)) {
          toast.error(
            t("auth.login-error", {
              message: error.message,
              code: error.code,
            })
          );
        } else {
          toast.error(
            t("auth.login-error", {
              message: (error as { message?: string })?.message || "Unknown",
              code: "unknown",
            })
          );
        }
      }

      return false;
    },
    [config?.disable_login, loadUser, renewAccess, reset, t]
  );

  const logout = useCallback(async () => {
    try {
      await MFApi.logout();

      toast.success(t("auth.logout-successful"));
    } catch (error) {
      console.error("Error while trying to logout: ", error);

      if (axios.isAxiosError(error)) {
        toast.error(
          t("auth.logout-error", {
            message: error.message,
            code: error.code,
          })
        );
      } else {
        toast.error(
          t("auth.logout-error", {
            message: (error as { message?: string })?.message || "Unknown",
            code: "unknown",
          })
        );
      }
    }

    authStoreActions.resetSlice();
    await sleep(1000);

    await reset();

    return true;
  }, [reset, t]);

  const registration = useCallback(
    async (
      email: string,
      password: string,
      firstname: string,
      lastname: string,
      birthdate: number,
      nickname?: string,
      rolestext?: string
    ) => {
      try {
        const response = await MFApi.registration({
          email,
          password,
          firstname,
          lastname,
          nickname,
          birthdate,
          rolestext,
        });

        if (!response.data?.success) {
          throw new Error("Registration was not successful.");
        }

        toast.success(
          t("auth.registration-successful", {
            name: user?.nickname || user?.name,
          })
        );

        return true;
      } catch (error) {
        console.error("Error while trying to register: ", error);

        if (axios.isAxiosError(error)) {
          toast.error(
            <>
              {t("auth.registration-error", {
                code: error.code,
              })}

              {!!error.message && (
                <>
                  <br />
                  {error.message}
                </>
              )}
            </>
          );
        } else {
          const errorMessage = (error as { message?: string })?.message;
          toast.error(
            <>
              {t("auth.registration-error", {
                code: "unknown",
              })}

              {!!errorMessage && (
                <>
                  <br />
                  {errorMessage}
                </>
              )}
            </>
          );
        }

        return false;
      }
    },
    [t, user?.name, user?.nickname]
  );

  const registrationConfirm = useCallback(
    async (token: string) => {
      try {
        const response = await MFApi.registrationConfirm({
          token,
        });

        if (!response.data?.success) {
          throw new Error("Registration confirmation was not successful.");
        }

        toast.success(
          t("auth.registration-confirm-successful", {
            name: user?.nickname || user?.name,
          })
        );
      } catch (error) {
        console.error("Error while trying to confirm registration: ", error);

        if (axios.isAxiosError(error)) {
          toast.error(
            <>
              {t("auth.registration-confirm-error", {
                code: error.code,
              })}

              {!!error.message && (
                <>
                  <br />
                  {error.message}
                </>
              )}
            </>,
            { autoClose: false, theme: "colored" }
          );
        } else {
          const errorMessage = (error as { message?: string })?.message;
          toast.error(
            <>
              {t("auth.registration-confirm-error", {
                code: "unknown",
              })}

              {!!errorMessage && (
                <>
                  <br />
                  {errorMessage}
                </>
              )}
            </>
          );
        }
      }

      const url = new URL(window.location.href);
      if (url.searchParams.get("registration_confirm")) {
        // Remove registration_confirm param from url
        url.searchParams.delete("registration_confirm");
        history.replaceState(history.state, "", url.href);
      }

      return true;
    },
    [t, user?.name, user?.nickname]
  );

  const initialize = useCallback(async () => {
    await loadUser();

    initializationStoreActions.setPartInitialized("auth");
  }, [loadUser]);

  return {
    loadUser,
    renewAccess,
    login,
    logout,
    registration,
    registrationConfirm,
    initialize,
  };
};
