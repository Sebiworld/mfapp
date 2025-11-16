import { MFApi } from "@api/axios/mfApi";
import axios from "axios";
import { toast } from "react-toastify";
import { t } from "i18next";
import { useGlobalStore } from "../global.store";
import { initializationStoreActions } from "../initialization/initialization.actions";
import { selectConfiguration } from "../configuration/configuration.selectors";

const setNickname = (nickname?: string) => {
  useGlobalStore.setState((state) => {
    state.nickname = nickname;
    return state;
  });
};

const refreshUser = async () => {
  useGlobalStore.setState((state) => ({
    user: { ...state.user, status: "loading" },
  }));

  try {
    const params: { [key: string]: unknown } = {};
    const hash = useGlobalStore.getState().user?.data?.hash;
    if (hash) {
      params.hash = hash;
    }

    const response = await MFApi.getCurrentUser(params);

    if (!response.data?.id) {
      throw new Error("No valid user object found");
    }

    if (response.status === 204) {
      useGlobalStore.setState((state) => ({
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

    useGlobalStore.setState((state) => ({
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
      useGlobalStore.setState((state) => ({
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
      useGlobalStore.setState((state) => ({
        user: {
          ...state.user,
          status: "error",
          name: (error as { message?: string })?.message || "Unknown",
        },
      }));
    }
  }
};

const login = async (email: string, password: string) => {
  const config = selectConfiguration(useGlobalStore.getState());
  if (config?.configuration?.disable_login) {
    toast.error(t("auth.login-disabled"));
    return;
  }

  try {
    const response = await MFApi.login(email, password);

    if (!response.data?.refresh_token) {
      throw new Error("No valid refresh token retrieved.");
    }

    useGlobalStore.setState((state) => {
      state.refreshToken = response?.data?.refresh_token;
      return state;
    });

    await renewAccess();

    await initializationStoreActions.resetApp(false);

    toast.success(
      t("auth.login-successful", {
        name:
          useGlobalStore.getState().user?.data?.nickname ||
          useGlobalStore.getState().user?.data?.name,
      })
    );
  } catch (error) {
    console.error("Error while trying to login: ", error);
    await initializationStoreActions.resetApp();

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
};

const renewAccess = async () => {
  try {
    const refreshToken = useGlobalStore.getState().refreshToken;
    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const response = await MFApi.loginAccess(refreshToken);
    if (!response.data?.access_token) {
      throw new Error("No valid access token retrieved");
    }

    useGlobalStore.setState((state) => {
      state.refreshToken = response?.data?.refresh_token;
      state.accessToken = response?.data?.access_token;
      return state;
    });

    await refreshUser();
  } catch (error) {
    console.error("Error while trying to renew access: ", error);
    const resetApp = initializationStoreActions.resetApp;
    await resetApp(true);
  }
};

const logout = async () => {
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

  await initializationStoreActions.resetApp();
};

const resetAuth = async () => {
  useGlobalStore.setState((state) => {
    state.accessToken = undefined;
    state.refreshToken = undefined;
    state.user = undefined;
    return state;
  });
};

const registration = async (
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
        name:
          useGlobalStore.getState().user?.data?.nickname ||
          useGlobalStore.getState().user?.data?.name,
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
};

const registrationConfirm = async (token: string) => {
  try {
    const response = await MFApi.registrationConfirm({
      token,
    });

    if (!response.data?.success) {
      throw new Error("Registration confirmation was not successful.");
    }

    toast.success(
      t("auth.registration-confirm-successful", {
        name:
          useGlobalStore.getState().user?.data?.nickname ||
          useGlobalStore.getState().user?.data?.name,
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
};

export const authStoreActions = {
  setNickname,
  refreshUser,
  login,
  renewAccess,
  logout,
  resetAuth,
  registration,
  registrationConfirm,
};
