import { MFApi } from "@api/axios/mfApi";
import { LoadingStatus } from "@models/loading-status.model";
import { PageDtoVariant } from "@models/page/page-dto-variant.model";
import { useGlobalStore } from "../global.store";
import axios from "axios";
import { initializationStoreActions } from "../initialization/initialization.actions";

const loadPage = async (path: string) => {
  useGlobalStore.setState((state) => {
    const stateChanges = {
      pages: { ...state.pages },
    };
    const change = { status: "loading" };

    if (!stateChanges.pages[path]?.status) {
      stateChanges.pages[path] = change as LoadingStatus<PageDtoVariant>;
    } else {
      stateChanges.pages[path] = {
        ...stateChanges.pages[path],
        ...(change as LoadingStatus<PageDtoVariant>),
      };
    }

    return stateChanges;
  });

  try {
    const params: { [key: string]: unknown } = {};
    const hash = useGlobalStore.getState().pages?.[path]?.data?.hash;
    if (hash) {
      params.hash = hash;
    }

    const response = await MFApi.getPage(path, params);
    const page = response.data;

    if (response.status === 204) {
      useGlobalStore.setState((state) => {
        const stateChanges = {
          pages: { ...state.pages },
        };
        const change = {
          status: "success",
          name: undefined,
          code: undefined,
          statusCode: undefined,
          message: undefined,
          stack: undefined,
        };

        if (!stateChanges.pages[path]?.status) {
          stateChanges.pages[path] = change as LoadingStatus<PageDtoVariant>;
        } else {
          stateChanges.pages[path] = {
            ...stateChanges.pages[path],
            ...(change as LoadingStatus<PageDtoVariant>),
          };
        }
        return stateChanges;
      });
      return;
    }

    useGlobalStore.setState((state) => {
      const stateChanges = {
        pages: { ...state.pages },
      };
      const change = {
        status: "success",
        data: page,
        name: undefined,
        code: undefined,
        statusCode: undefined,
        message: undefined,
        stack: undefined,
      };

      if (!stateChanges.pages[path]?.status) {
        stateChanges.pages[path] = change as LoadingStatus<PageDtoVariant>;
      } else {
        stateChanges.pages[path] = {
          ...stateChanges.pages[path],
          ...(change as LoadingStatus<PageDtoVariant>),
        };
      }
      return stateChanges;
    });
  } catch (error) {
    console.error("Error in data fetch:", error);
    if (axios.isAxiosError(error)) {
      useGlobalStore.setState((state) => {
        const stateChanges = {
          pages: { ...state.pages },
        };
        const change = {
          status: "error",
          name: error.name,
          code: error.code,
          statusCode: error.status,
          message: error.message,
          stack: error.stack,
        };

        if (!stateChanges.pages[path]?.status) {
          stateChanges.pages[path] = change as LoadingStatus<PageDtoVariant>;
        } else {
          stateChanges.pages[path] = {
            ...stateChanges.pages[path],
            ...(change as LoadingStatus<PageDtoVariant>),
          };
        }
        return stateChanges;
      });
    } else {
      useGlobalStore.setState((state) => {
        const stateChanges = {
          pages: { ...state.pages },
        };
        const change = {
          status: "error",
          name: (error as { message?: string })?.message || "Unknown",
        };

        if (!stateChanges.pages[path]?.status) {
          stateChanges.pages[path] = change as LoadingStatus<PageDtoVariant>;
        } else {
          stateChanges.pages[path] = {
            ...stateChanges.pages[path],
            ...(change as LoadingStatus<PageDtoVariant>),
          };
        }
        return stateChanges;
      });
    }
  }
};

const initializePages = async () => {
  initializationStoreActions.setPartInitialized("pages");
};

const resetPages = async () => {
  useGlobalStore.setState((state) => {
    state.pages = {};
    return state;
  });

  await initializePages();
};

export const pagesStoreActions = {
  loadPage,
  initializePages,
  resetPages,
};
