import axios from "axios";
import axiosRetry from "axios-retry";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APIURL,
  headers: {
    "content-type": "application/json",
    "x-api-key": import.meta.env.VITE_APIKEY,
  },
});

axiosRetry(axiosInstance, { retries: 2 });

axiosInstance.defaults.withCredentials = true;

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = useGlobalStore.getState().accessToken;
//     if (accessToken) {
//       config.headers["Authorization"] = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// const isRenewableRequest = (error: AxiosError<ErrorResponseDto>): boolean => {
//   if (
//     error?.config &&
//     (error.config as unknown as { _retry?: boolean })._retry
//   ) {
//     return false;
//   }

//   console.log("isRenewableRequest", error);

//   if (error?.response?.data?.errorcode === "access_token_expired") {
//     return true;
//   }

//   // if (
//   //   error?.response?.status === 400 &&
//   //   (error?.response?.data as ErrorResponseDto)?.errorcode ===
//   //     "access_token_invalid"
//   // ) {
//   //   return true;
//   // }

//   return false;
// };

// TODO
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     if (isRenewableRequest(error)) {
//       // TODO Add additionals.can_renew === true
//       originalRequest._retry = true;

//       try {
//         await authStoreActions.renewAccess();
//         const accessToken = useGlobalStore.getState().accessToken;
//         originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
//         return axiosInstance(originalRequest);
//       } catch (err) {
//         // TODO User Feedback
//         await authStoreActions.logout();
//         return Promise.reject(err);
//       }
//     }

//     return Promise.reject(error);
//   }
// );
