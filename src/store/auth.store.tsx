import { StateCreator } from "zustand";
import { GlobalStore } from "./global.store";
import { MFApi } from "@api/axios/mfApi";
import { LoadingStatus } from "@models/loading-status.model";
import { PermissionDto, RoleDto, UserDto } from "@models/user-dto.model";
import axios from "axios";
import { toast } from "react-toastify";
import { t } from "i18next";

export interface AuthSlice {
  nickname?: string;
  setNickname: (nickname?: string) => void;

  refreshToken?: string;
  accessToken?: string;

  user?: LoadingStatus<UserDto>;
  refreshUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  renewAccess: () => Promise<void>;
  logout: () => Promise<void>;
  registration: (
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    birthdate: number,
    nickname?: string,
    rolestext?: string
  ) => Promise<void>;
  registrationConfirm: (token: string) => Promise<void>;

  resetAuth: () => Promise<void>;
}

export const createAuthSlice: StateCreator<GlobalStore, [], [], AuthSlice> = (
  set,
  get
) => ({
  nickname: undefined,
  setNickname: (nickname?: string) => {
    set((state) => {
      state.nickname = nickname;
      return state;
    });
  },

  refreshToken: undefined,
  accessToken: undefined,

  user: undefined,

  refreshUser: async () => {
    set((state) => ({
      user: { ...state.user, status: "loading" },
    }));

    try {
      const params: { [key: string]: unknown } = {};
      const hash = get().user?.data?.hash;
      if (hash) {
        params.hash = hash;
      }

      const response = await MFApi.getCurrentUser(params);

      if (!response.data?.id) {
        throw new Error("No valid user object found");
      }

      if (response.status === 204) {
        set((state) => ({
          user: {
            ...state.user,
            status: "success",
            name: undefined,
            code: undefined,
            statusCode: undefined,
            message: undefined,
            stack: undefined,
          },
        }));
        return;
      }

      set((state) => ({
        user: {
          ...state.user,
          status: "success",
          data: response.data,
          name: undefined,
          code: undefined,
          statusCode: undefined,
          message: undefined,
          stack: undefined,
        },
      }));
    } catch (error) {
      console.error("Error in data fetch:", error);
      if (axios.isAxiosError(error)) {
        set((state) => ({
          user: {
            ...state.user,
            status: "error",
            name: error.name,
            code: error.code,
            statusCode: error.status,
            message: error.message,
            stack: error.stack,
          },
        }));
      } else {
        set((state) => ({
          user: {
            ...state.user,
            status: "error",
            name: (error as { message?: string })?.message || "Unknown",
          },
        }));
      }
    }
  },

  login: async (email: string, password: string) => {
    try {
      const response = await MFApi.login(email, password);

      if (!response.data?.refresh_token) {
        throw new Error("No valid refresh token retrieved.");
      }

      set((state) => {
        state.refreshToken = response?.data?.refresh_token;
        return state;
      });

      const renewAccess = get().renewAccess;
      await renewAccess();

      const resetApp = get().resetApp;
      await resetApp(false);

      toast.success(
        t("auth.login-successful", {
          name: get().user?.data?.nickname || get().user?.data?.name,
        })
      );
    } catch (error) {
      console.error("Error while trying to login: ", error);
      const resetApp = get().resetApp;
      await resetApp();

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
  },

  renewAccess: async () => {
    try {
      const refreshToken = get().refreshToken;
      if (!refreshToken) {
        throw new Error("No refresh token found");
      }

      const response = await MFApi.loginAccess(refreshToken);
      if (!response.data?.access_token) {
        throw new Error("No valid access token retrieved");
      }

      set((state) => {
        state.refreshToken = response?.data?.refresh_token;
        state.accessToken = response?.data?.access_token;
        return state;
      });

      const refreshUser = get().refreshUser;
      await refreshUser();

      console.log("LOGIN Renew Success.", response);
    } catch (error) {
      console.error("Error while trying to renew access: ", error);
      const resetApp = get().resetApp;
      await resetApp();
    }
  },

  logout: async () => {
    try {
      const response = await MFApi.logout();
      console.log("LOGOUT Success.", response);
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

    const resetApp = get().resetApp;
    await resetApp();
  },

  resetAuth: async () => {
    set((state) => {
      state.accessToken = undefined;
      state.refreshToken = undefined;
      state.user = undefined;
      return state;
    });
  },

  registration: async (
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
          name: get().user?.data?.nickname || get().user?.data?.name,
        })
      );
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
    }
  },

  registrationConfirm: async (token: string) => {
    try {
      const response = await MFApi.registrationConfirm({
        token,
      });

      if (!response.data?.success) {
        throw new Error("Registration confirmation was not successful.");
      }

      toast.success(
        t("auth.registration-confirm-successful", {
          name: get().user?.data?.nickname || get().user?.data?.name,
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
  },
});

export const selectCurrentUser = (state: GlobalStore) => state.user;
export const selectIsLoggedIn = (state: GlobalStore) =>
  !!state.user?.data?.isLoggedIn;
export const selectRoles = (state: GlobalStore): RoleDto[] =>
  state.user?.data?.roles || [];
export const selectPermissions = (state: GlobalStore): PermissionDto[] =>
  state.user?.data?.permissions || [];
export const selectUserHash = (state: GlobalStore) => state.user?.data?.hash;

export const selectNickname = (state: GlobalStore) => state.nickname;
export const selectSetNickname = (state: GlobalStore) => state.setNickname;

export const selectRefreshToken = (state: GlobalStore) => state.refreshToken;
export const selectAccessToken = (state: GlobalStore) => state.accessToken;

export const selectLogin = (state: GlobalStore) => state.login;
export const selectLogout = (state: GlobalStore) => state.logout;
export const selectRegistration = (state: GlobalStore) => state.registration;
export const selectRegistrationConfirm = (state: GlobalStore) =>
  state.registrationConfirm;
