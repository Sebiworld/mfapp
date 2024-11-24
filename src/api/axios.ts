import { useGlobalStore } from "@src/store/global.store";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APIURL,
  headers: {
    "content-type": "application/json",
    "x-api-key": import.meta.env.VITE_APIKEY,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = useGlobalStore.getState().accessToken;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      // TODO Add additionals.can_renew === true
      originalRequest._retry = true;

      try {
        const renewAccess = useGlobalStore.getState().renewAccess;
        await renewAccess();
        const accessToken = useGlobalStore.getState().accessToken;
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        const logout = useGlobalStore.getState().logout;
        // TODO User Feedback
        await logout();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
