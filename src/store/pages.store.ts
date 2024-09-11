import { PageDtoVariant } from "@models/page/page-dto-variant.model";
import { ProjectDto } from "@models/project-dto.model";
import { StateCreator } from "zustand";
import { GlobalStore } from "./global.store";
import { MFApi } from "@api/api";
import { LoadingStatus } from "@models/loading-status.model";
import { reduceToIdMap } from "@utils/functions/reduceToIdMap";
import axios from "axios";

export interface PagesState {
  pages: { [key: string]: LoadingStatus<PageDtoVariant> };
  projects: LoadingStatus<{ [key: string]: ProjectDto }>;
}

export interface PagesActions {
  loadPage: (path: string) => Promise<void>;
  loadProjects: () => Promise<void>;
}

export type PagesSlice = PagesState & PagesActions;

export const createPagesSlice: StateCreator<GlobalStore, [], [], PagesSlice> = (
  set
) => ({
  pages: {},
  projects: {
    status: "uninitialized",
  },

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
      const response = await MFApi.getPage(path);
      const page = response.data;

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

  loadProjects: async () => {
    set((state) => ({ projects: { ...state.projects, status: "loading" } }));
    try {
      const response = await MFApi.getProjects();
      const projectsObject = reduceToIdMap<ProjectDto>(response.data);
      set((state) => ({
        projects: {
          ...state.projects,
          status: "success",
          data: projectsObject,
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
          projects: {
            ...state.projects,
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
          projects: {
            ...state.projects,
            status: "error",
            name: (error as { message?: string })?.message || "Unknown",
          },
        }));
      }
    }
  },
});

export const selectLoadPage = (state: GlobalStore) => state.loadPage;
export const selectPage = (path: string) => (state: GlobalStore) =>
  state.pages[path];
export const selectLoadProjects = (state: GlobalStore) => state.loadProjects;
export const selectProjects = (state: GlobalStore) => state.projects;
