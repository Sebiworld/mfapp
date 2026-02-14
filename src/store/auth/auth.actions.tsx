import { useGlobalStore } from "../global.store";
import { UserDto } from "@models/user-dto.model";

const setNickname = (nickname?: string) => {
  useGlobalStore.setState({
    nickname,
  });
};

const setUser = async (user: UserDto | undefined) => {
  useGlobalStore.setState({
    user,
  });
};

const setRefreshToken = async (refreshToken: string) => {
  useGlobalStore.setState({
    refreshToken,
  });
};

const setAccessToken = async (accessToken: string, refreshToken: string) => {
  useGlobalStore.setState({
    accessToken,
    refreshToken,
  });
};

// const login = async (email: string, password: string) => {
//   const config = selectConfigurationParams(useGlobalStore.getState());
//   if (config?.disable_login) {
//     toast.error(t("auth.login-disabled"));
//     return;
//   }

//   try {
//     const response = await MFApi.login(email, password);

//     if (!response.data?.refresh_token) {
//       throw new Error("No valid refresh token retrieved.");
//     }

//     useGlobalStore.setState((state) => {
//       state.refreshToken = response?.data?.refresh_token;
//       return state;
//     });

//     await renewAccess();

//     await initializationStoreActions.resetApp(false);

//     toast.success(
//       t("auth.login-successful", {
//         name:
//           useGlobalStore.getState().user?.nickname ||
//           useGlobalStore.getState().user?.name,
//       })
//     );
//   } catch (error) {
//     console.error("Error while trying to login: ", error);
//     await initializationStoreActions.resetApp();

//     if (axios.isAxiosError(error)) {
//       toast.error(
//         t("auth.login-error", {
//           message: error.message,
//           code: error.code,
//         })
//       );
//     } else {
//       toast.error(
//         t("auth.login-error", {
//           message: (error as { message?: string })?.message || "Unknown",
//           code: "unknown",
//         })
//       );
//     }
//   }
// };

// const renewAccess = async () => {
//   try {
//     const refreshToken = useGlobalStore.getState().refreshToken;
//     if (!refreshToken) {
//       throw new Error("No refresh token found");
//     }

//     const response = await MFApi.loginAccess(refreshToken);
//     if (!response.data?.access_token) {
//       throw new Error("No valid access token retrieved");
//     }

//     useGlobalStore.setState((state) => {
//       state.refreshToken = response?.data?.refresh_token;
//       state.accessToken = response?.data?.access_token;
//       return state;
//     });

//     await refreshUser();
//   } catch (error) {
//     console.error("Error while trying to renew access: ", error);
//     const resetApp = initializationStoreActions.resetApp;
//     await resetApp(true);
//   }
// };

// const logout = async () => {
//   try {
//     await MFApi.logout();
//     toast.success(t("auth.logout-successful"));
//   } catch (error) {
//     console.error("Error while trying to logout: ", error);

//     if (axios.isAxiosError(error)) {
//       toast.error(
//         t("auth.logout-error", {
//           message: error.message,
//           code: error.code,
//         })
//       );
//     } else {
//       toast.error(
//         t("auth.logout-error", {
//           message: (error as { message?: string })?.message || "Unknown",
//           code: "unknown",
//         })
//       );
//     }
//   }

//   await initializationStoreActions.resetApp();
// };

// const registration = async (
//   email: string,
//   password: string,
//   firstname: string,
//   lastname: string,
//   birthdate: number,
//   nickname?: string,
//   rolestext?: string
// ) => {
//   try {
//     const response = await MFApi.registration({
//       email,
//       password,
//       firstname,
//       lastname,
//       nickname,
//       birthdate,
//       rolestext,
//     });

//     if (!response.data?.success) {
//       throw new Error("Registration was not successful.");
//     }

//     toast.success(
//       t("auth.registration-successful", {
//         name:
//           useGlobalStore.getState().user?.data?.nickname ||
//           useGlobalStore.getState().user?.data?.name,
//       })
//     );
//   } catch (error) {
//     console.error("Error while trying to register: ", error);

//     if (axios.isAxiosError(error)) {
//       toast.error(
//         <>
//           {t("auth.registration-error", {
//             code: error.code,
//           })}

//           {!!error.message && (
//             <>
//               <br />
//               {error.message}
//             </>
//           )}
//         </>
//       );
//     } else {
//       const errorMessage = (error as { message?: string })?.message;
//       toast.error(
//         <>
//           {t("auth.registration-error", {
//             code: "unknown",
//           })}

//           {!!errorMessage && (
//             <>
//               <br />
//               {errorMessage}
//             </>
//           )}
//         </>
//       );
//     }
//   }
// };

// const registrationConfirm = async (token: string) => {
//   try {
//     const response = await MFApi.registrationConfirm({
//       token,
//     });

//     if (!response.data?.success) {
//       throw new Error("Registration confirmation was not successful.");
//     }

//     toast.success(
//       t("auth.registration-confirm-successful", {
//         name:
//           useGlobalStore.getState().user?.data?.nickname ||
//           useGlobalStore.getState().user?.data?.name,
//       })
//     );
//   } catch (error) {
//     console.error("Error while trying to confirm registration: ", error);

//     if (axios.isAxiosError(error)) {
//       toast.error(
//         <>
//           {t("auth.registration-confirm-error", {
//             code: error.code,
//           })}

//           {!!error.message && (
//             <>
//               <br />
//               {error.message}
//             </>
//           )}
//         </>,
//         { autoClose: false, theme: "colored" }
//       );
//     } else {
//       const errorMessage = (error as { message?: string })?.message;
//       toast.error(
//         <>
//           {t("auth.registration-confirm-error", {
//             code: "unknown",
//           })}

//           {!!errorMessage && (
//             <>
//               <br />
//               {errorMessage}
//             </>
//           )}
//         </>
//       );
//     }
//   }

//   const url = new URL(window.location.href);
//   if (url.searchParams.get("registration_confirm")) {
//     // Remove registration_confirm param from url
//     url.searchParams.delete("registration_confirm");
//     history.replaceState(history.state, "", url.href);
//   }
// };

const resetSlice = async () => {
  useGlobalStore.setState((state) => {
    state.accessToken = undefined;
    state.refreshToken = undefined;
    state.user = undefined;
    return state;
  });
};

export const authStoreActions = {
  setNickname,
  setUser,
  setRefreshToken,
  setAccessToken,
  // login,
  // renewAccess,
  // logout,
  resetSlice,
  // registration,
  // registrationConfirm,
};
