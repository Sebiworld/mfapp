import { PageDtoVariant } from "@models/page/page-dto-variant.model";
import { StateCreator } from "zustand";
import { GlobalStore } from "./global.store";
import { MFApi } from "@api/mfApi";
import { LoadingStatus } from "@models/loading-status.model";
import axios from "axios";

export interface PagesState {
  pages: { [key: string]: LoadingStatus<PageDtoVariant> };
}

export interface PagesActions {
  loadPage: (path: string) => Promise<void>;

  initializePages: () => Promise<void>;
  resetPages: () => Promise<void>;
}

export type PagesSlice = PagesState & PagesActions;

export const createPagesSlice: StateCreator<GlobalStore, [], [], PagesSlice> = (
  set,
  get
) => ({
  pages: {},

  loadPage: async (path: string) => {
    set((state) => {
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
      const hash = get().pages?.[path]?.data?.hash;
      if (hash) {
        params.hash = hash;
      }

      const response = await MFApi.getPage(path, params);
      const page = response.data;

      if (response.status === 204) {
        set((state) => {
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

      set((state) => {
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
        set((state) => {
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
        set((state) => {
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
  },

  initializePages: async () => {
    const setPartInitialized = get().setPartInitialized;
    setPartInitialized("pages");
  },

  resetPages: async () => {
    set((state) => {
      state.pages = {};
      return state;
    });

    const initializePages = get().initializePages;
    await initializePages();
  },
});

export const selectLoadPage = (state: GlobalStore) => state.loadPage;
export const selectPage = (path: string) => (state: GlobalStore) =>
  state.pages[path];
