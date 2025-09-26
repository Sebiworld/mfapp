import { StateCreator } from "zustand";
import { GlobalStore } from "./global.store";
import { MFApi } from "@api/axios/mfApi";
import { LoadingStatus } from "@models/loading-status.model";
import axios from "axios";
import { GetConfigurationResponse, GetMenuesResponse } from "@api/axios/configApi";

export interface ConfigurationState {
  configuration: LoadingStatus<GetConfigurationResponse>;
  menues: LoadingStatus<GetMenuesResponse>;
}

export interface ConfigurationActions {
  loadConfiguration: () => Promise<void>;
  loadMenues: () => Promise<void>;

  initializeConfiguration: () => Promise<void>;
  resetConfiguration: () => Promise<void>;
}

export type ConfigurationSlice = ConfigurationState & ConfigurationActions;

export const createConfigurationSlice: StateCreator<
  GlobalStore,
  [],
  [],
  ConfigurationSlice
> = (set, get) => ({
  configuration: {
    status: "uninitialized",
  },
  menues: {
    status: "uninitialized",
  },

  loadConfiguration: async () => {
    set((state) => ({
      configuration: { ...state.configuration, status: "loading" },
    }));

    try {
      const params: { [key: string]: unknown } = {};
      const hash = get().configuration?.data?.hash;
      if (hash) {
        params.hash = hash;
      }

      const response = await MFApi.getConfiguration(params);
      const configurationObject = response.data;

      if (response.status === 204) {
        set((state) => ({
          configuration: {
            ...state.configuration,
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
        configuration: {
          ...state.configuration,
          status: "success",
          data: configurationObject,
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
          configuration: {
            ...state.configuration,
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
          configuration: {
            ...state.configuration,
            status: "error",
            name: (error as { message?: string })?.message || "Unknown",
          },
        }));
      }
    }
  },

  loadMenues: async () => {
    set((state) => ({ menues: { ...state.menues, status: "loading" } }));

    try {
      const params: { [key: string]: unknown } = {};
      const hash = get().menues?.data?.hash;
      if (hash) {
        params.hash = hash;
      }

      const response = await MFApi.getMenues(params);
      const menuesObject = response.data;

      if (response.status === 204) {
        set((state) => ({
          menues: {
            ...state.menues,
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
        menues: {
          ...state.menues,
          status: "success",
          data: menuesObject,
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
          menues: {
            ...state.menues,
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
          menues: {
            ...state.menues,
            status: "error",
            name: (error as { message?: string })?.message || "Unknown",
          },
        }));
      }
    }
  },

  initializeConfiguration: async () => {
    const loadConfiguration = get().loadConfiguration;
    await loadConfiguration();

    const loadMenues = get().loadMenues;
    await loadMenues();

    const setPartInitialized = get().setPartInitialized;
    setPartInitialized("configuration");
  },

  resetConfiguration: async () => {
    set((state) => {
      state.configuration = {
        status: "uninitialized",
      };
      state.menues = {
        status: "uninitialized",
      };
      return state;
    });

    const initializeConfiguration = get().initializeConfiguration;
    await initializeConfiguration();
  },
});

export const selectConfigurationLoadingStatus = (state: GlobalStore) =>
  state.configuration;
export const selectConfiguration = (state: GlobalStore) =>
  state.configuration?.data;
export const selectMenuesLoadingStatus = (state: GlobalStore) => state.menues;
export const selectMenues = (state: GlobalStore) => state.menues?.data;
