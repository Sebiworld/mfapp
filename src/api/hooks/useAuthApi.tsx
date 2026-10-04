import { MFApi } from "@api/axios/mfApi";
import { UserDto } from "@models/user-dto.model";
import { authStoreActions } from "@src/store/auth/auth.actions";
import {
  selectCurrentUser,
  selectRefreshToken,
  selectUserHash,
} from "@src/store/auth/auth.selectors";
import { selectConfigurationParams } from "@src/store/configuration/configuration.selectors";
import { useGlobalStore } from "@src/store/global.store";
import { initializationStoreActions } from "@src/store/initialization/initialization.actions";
import { useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import axios from "axios";
import { useReset } from "./useReset";
import { sleep } from "@utils/functions/sleep";
import { isError } from "@utils/functions/isError";
import { SessionChangedError, watchSession } from "@api/session/watchSession";

/**
 * Tells whether the backend answered with another account than the logged-in one in the store (e.g. a store
 * changed by hand, or another tab that logged in meanwhile). A stored guest or no stored user is no change.
 * @param storedUser User in the store before the request.
 * @param loadedUser User the backend answered with.
 * @returns `true` when the stored logged-in account and the answered account differ.
 */
const isOtherAccount = (
  storedUser: UserDto | undefined,
  loadedUser: UserDto
): boolean => !!storedUser?.isLoggedIn && storedUser.id !== loadedUser.id;

interface UseAuthApiOutput {
  loadUser: () => Promise<UserDto | true | Error>;
  renewAccess: (refreshToken?: string) => Promise<string | false>;
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

  const config = useGlobalStore(selectConfigurationParams);
  const refreshTokenFromStore = useGlobalStore(selectRefreshToken);
  const user = useGlobalStore(selectCurrentUser);
  // Primitive copies keep the registration callbacks stable when only other user fields change.
  const userName = user?.name;
  const userNickname = user?.nickname;

  const { reset } = useReset();
  // `loadUser` must keep its identity, so it reaches the current `reset` through a ref.
  const resetRef = useRef(reset);

  useEffect(() => {
    resetRef.current = reset;
  }, [reset]);

  // Reads the hash at call time and stays the same function for the whole visit: the app initialization depends
  // on it and must not start again when the user or the token changes.
  const loadUser = useCallback(async (): Promise<UserDto | true | Error> => {
    try {
      const params: { [key: string]: unknown } = {};
      const storedUser = selectCurrentUser(useGlobalStore.getState());
      const hash = selectUserHash(useGlobalStore.getState());
      if (hash) {
        params.hash = hash;
      }

      const isSameSession = watchSession();
      const response = await MFApi.getCurrentUser(params);

      // The answer belongs to a session that has ended meanwhile (e.g. a logout): it must not bring its user back.
      if (!isSameSession()) {
        return new SessionChangedError();
      }

      if (response.status === 204) {
        return true;
      }

      if (!response.data?.id) {
        throw new Error("No valid user object found");
      }

      authStoreActions.setUser(response.data);

      // Data and views of the previous account must not stay: start a new session that keeps the new tokens and
      // user. The reset itself does not load the user again, so it cannot repeat.
      if (isOtherAccount(storedUser, response.data)) {
        await resetRef.current(false);
      }

      return response.data;
    } catch (error) {
      console.error("Error in data fetch:", error);
      return error as Error;
    }
  }, []);

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

        // An unchanged user answers 204: the user loaded during the renewal is already in the store.
        const loadUserResult = await loadUser();
        const loadedUser = isError(loadUserResult)
          ? undefined
          : selectCurrentUser(useGlobalStore.getState());
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

    // Tokens, user and the data loaded with them go at once, so nothing of the account stays visible.
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
            name: userNickname || userName,
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
    [t, userName, userNickname]
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
            name: userNickname || userName,
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
    [t, userName, userNickname]
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
