import { MFApi } from "@api/axios/mfApi";
import axios from "axios";
import { useGlobalStore } from "../global.store";
import { initializationStoreActions } from "../initialization/initialization.actions";

const loadConfiguration = async () => {
  useGlobalStore.setState((state) => ({
    configuration: { ...state.configuration, status: "loading" },
  }));

  try {
    const params: { [key: string]: unknown } = {};
    const hash = useGlobalStore.getState().configuration?.data?.hash;
    if (hash) {
      params.hash = hash;
    }

    const response = await MFApi.getConfiguration(params);
    const configurationObject = response.data;

    if (response.status === 204) {
      useGlobalStore.setState((state) => ({
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

    useGlobalStore.setState((state) => ({
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
      useGlobalStore.setState((state) => ({
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
      useGlobalStore.setState((state) => ({
        configuration: {
          ...state.configuration,
          status: "error",
          name: (error as { message?: string })?.message || "Unknown",
        },
      }));
    }
  }
};

const loadMenues = async () => {
  useGlobalStore.setState((state) => ({
    menues: { ...state.menues, status: "loading" },
  }));

  try {
    const params: { [key: string]: unknown } = {};
    const hash = useGlobalStore.getState().menues?.data?.hash;
    if (hash) {
      params.hash = hash;
    }

    const response = await MFApi.getMenues(params);
    const menuesObject = response.data;

    if (response.status === 204) {
      useGlobalStore.setState((state) => ({
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

    useGlobalStore.setState((state) => ({
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
      useGlobalStore.setState((state) => ({
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
      useGlobalStore.setState((state) => ({
        menues: {
          ...state.menues,
          status: "error",
          name: (error as { message?: string })?.message || "Unknown",
        },
      }));
    }
  }
};

const initializeConfiguration = async () => {
  await loadConfiguration();
  await loadMenues();

  initializationStoreActions.setPartInitialized("configuration");
};

const resetConfiguration = async () => {
  useGlobalStore.setState((state) => {
    state.configuration = {
      status: "uninitialized",
    };
    state.menues = {
      status: "uninitialized",
    };
    return state;
  });

  await initializeConfiguration();
};

export const configurationActions = {
  loadConfiguration,
  loadMenues,
  initializeConfiguration,
  resetConfiguration,
};
