import { AxiosResponse } from "axios";
import { axiosInstance } from "./axios";
import { UserDto } from "@models/user-dto.model";

export interface AuthLoginResponse {
  refresh_token: string;
  username: string;
}

export interface AuthAccessResponse {
  access_token: string;
  refresh_token: string;
}

export interface AuthLogoutResponse {
  success: boolean;
}

export interface AuthRegistrationResponse {
  success: boolean;
}

export interface AuthRegistrationConfirmResponse {
  success: boolean;
}

export const authApi = {
  getCurrentUser: (params?: {
    [key: string]: unknown;
  }): Promise<AxiosResponse<UserDto | undefined>> =>
    axiosInstance({
      method: "GET",
      url: `/auth`,
      params,
      transformResponse: (response): UserDto | undefined => {
        if (!response) {
          return;
        }

        try {
          const json = JSON.parse(response);
          return json as UserDto;
        } catch (e) {
          console.warn(e);
          throw new Error("Could not parse response");
        }
      },
    }),

  login: (
    email: string,
    password: string,
    params?: {
      [key: string]: unknown;
    }
  ): Promise<AxiosResponse<AuthLoginResponse | undefined>> =>
    axiosInstance({
      method: "POST",
      url: `/auth`,
      params,
      auth: {
        username: email,
        password,
      },
      transformResponse: (response): AuthLoginResponse | undefined => {
        if (!response) {
          return;
        }

        try {
          const json = JSON.parse(response);
          return json as AuthLoginResponse;
        } catch (e) {
          console.warn(e);
          throw new Error("Could not parse response");
        }
      },
    }),

  loginAccess: (
    refreshToken: string,
    params?: {
      [key: string]: unknown;
    }
  ): Promise<AxiosResponse<AuthAccessResponse | undefined>> =>
    axiosInstance({
      method: "POST",
      url: `/auth/access`,
      params,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
      transformResponse: (response): AuthAccessResponse | undefined => {
        if (!response) {
          return;
        }

        try {
          const json = JSON.parse(response);
          return json as AuthAccessResponse;
        } catch (e) {
          console.warn(e);
          throw new Error("Could not parse response");
        }
      },
    }),

  logout: (params?: {
    [key: string]: unknown;
  }): Promise<AxiosResponse<AuthAccessResponse | undefined>> =>
    axiosInstance({
      method: "DELETE",
      url: `/auth`,
      params,
      transformResponse: (response): AuthAccessResponse | undefined => {
        if (!response) {
          return;
        }

        try {
          const json = JSON.parse(response);
          return json as AuthAccessResponse;
        } catch (e) {
          console.warn(e);
          throw new Error("Could not parse response");
        }
      },
    }),

  registration: (params: {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    birthdate: number;
    nickname?: string;
    rolestext?: string;
    [key: string]: unknown;
  }): Promise<AxiosResponse<AuthRegistrationResponse | undefined>> =>
    axiosInstance({
      method: "POST",
      url: `/auth/registration`,
      params,
      transformResponse: (response): AuthRegistrationResponse | undefined => {
        if (!response) {
          return;
        }

        try {
          const json = JSON.parse(response);
          return json as AuthRegistrationResponse;
        } catch (e) {
          console.warn(e);
          throw new Error("Could not parse response");
        }
      },
    }),

  registrationConfirm: (params: {
    token: string;
    [key: string]: unknown;
  }): Promise<AxiosResponse<AuthRegistrationConfirmResponse | undefined>> =>
    axiosInstance({
      method: "POST",
      url: `/auth/registration_confirm`,
      params,
      transformResponse: (
        response
      ): AuthRegistrationConfirmResponse | undefined => {
        if (!response) {
          return;
        }

        try {
          const json = JSON.parse(response);
          return json as AuthRegistrationConfirmResponse;
        } catch (e) {
          console.warn(e);
          throw new Error("Could not parse response");
        }
      },
    }),
};
