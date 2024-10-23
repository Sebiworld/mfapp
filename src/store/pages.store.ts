import { PageDtoVariant } from "@models/page/page-dto-variant.model";
import { StateCreator } from "zustand";
import { GlobalStore } from "./global.store";
import { GetProjectsResponse, MFApi } from "@api/api";
import { LoadingStatus } from "@models/loading-status.model";
import axios from "axios";
import { ProjectDetailsDto } from "@models/project-dto.model";

export interface PagesState {
  pages: { [key: string]: LoadingStatus<PageDtoVariant> };
  projects: LoadingStatus<GetProjectsResponse>;
  projectDetails: { [key: number]: LoadingStatus<ProjectDetailsDto> };
}

export interface PagesActions {
  loadPage: (path: string) => Promise<void>;
  loadProjects: () => Promise<void>;
  loadProjectDetails: (id: number) => Promise<void>;
}

export type PagesSlice = PagesState & PagesActions;

export const createPagesSlice: StateCreator<GlobalStore, [], [], PagesSlice> = (
  set,
  get
) => ({
  pages: {},
  projects: {
    status: "uninitialized",
  },
  projectDetails: {},

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

  loadProjects: async () => {
    set((state) => ({ projects: { ...state.projects, status: "loading" } }));
    try {
      const params: { [key: string]: unknown } = {};
      const hash = get().projects?.data?.hash;
      if (hash) {
        params.hash = hash;
      }

      const response = await MFApi.getProjects(params);
      const projectsObject = response.data;

      if (response.status === 204) {
        set((state) => ({
          projects: {
            ...state.projects,
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

  loadProjectDetails: async (id: number) => {
    set((state) => {
      const stateChanges = {
        projectDetails: { ...state.projectDetails },
      };
      const change = { status: "loading" };

      if (!stateChanges.projectDetails[id]?.status) {
        stateChanges.projectDetails[id] =
          change as LoadingStatus<PageDtoVariant>;
      } else {
        stateChanges.projectDetails[id] = {
          ...stateChanges.projectDetails[id],
          ...(change as LoadingStatus<PageDtoVariant>),
        };
      }

      return stateChanges;
    });

    try {
      const params: { [key: string]: unknown } = {};
      const hash = get().projectDetails?.[id]?.data?.hash;
      if (hash) {
        params.hash = hash;
      }

      const response = await MFApi.getProjectDetails(id, params);
      const page = response.data;

      if (response.status === 204) {
        set((state) => {
          const stateChanges = {
            projectDetails: { ...state.projectDetails },
          };
          const change = {
            status: "success",
            name: undefined,
            code: undefined,
            statusCode: undefined,
            message: undefined,
            stack: undefined,
          };

          if (!stateChanges.projectDetails[id]?.status) {
            stateChanges.projectDetails[id] =
              change as LoadingStatus<ProjectDetailsDto>;
          } else {
            stateChanges.projectDetails[id] = {
              ...stateChanges.projectDetails[id],
              ...(change as LoadingStatus<ProjectDetailsDto>),
            };
          }
          return stateChanges;
        });
        return;
      }

      set((state) => {
        const stateChanges = {
          projectDetails: { ...state.projectDetails },
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

        if (!stateChanges.projectDetails[id]?.status) {
          stateChanges.projectDetails[id] =
            change as LoadingStatus<ProjectDetailsDto>;
        } else {
          stateChanges.projectDetails[id] = {
            ...stateChanges.projectDetails[id],
            ...(change as LoadingStatus<ProjectDetailsDto>),
          };
        }
        return stateChanges;
      });
    } catch (error) {
      console.error("Error in data fetch:", error);
      if (axios.isAxiosError(error)) {
        set((state) => {
          const stateChanges = {
            projectDetails: { ...state.projectDetails },
          };
          const change = {
            status: "error",
            name: error.name,
            code: error.code,
            statusCode: error.status,
            message: error.message,
            stack: error.stack,
          };

          if (!stateChanges.projectDetails[id]?.status) {
            stateChanges.projectDetails[id] =
              change as LoadingStatus<ProjectDetailsDto>;
          } else {
            stateChanges.projectDetails[id] = {
              ...stateChanges.projectDetails[id],
              ...(change as LoadingStatus<ProjectDetailsDto>),
            };
          }
          return stateChanges;
        });
      } else {
        set((state) => {
          const stateChanges = {
            projectDetails: { ...state.projectDetails },
          };
          const change = {
            status: "error",
            name: (error as { message?: string })?.message || "Unknown",
          };

          if (!stateChanges.projectDetails[id]?.status) {
            stateChanges.projectDetails[id] =
              change as LoadingStatus<ProjectDetailsDto>;
          } else {
            stateChanges.projectDetails[id] = {
              ...stateChanges.projectDetails[id],
              ...(change as LoadingStatus<ProjectDetailsDto>),
            };
          }
          return stateChanges;
        });
      }
    }
  },
});

export const selectLoadPage = (state: GlobalStore) => state.loadPage;
export const selectPage = (path: string) => (state: GlobalStore) =>
  state.pages[path];
export const selectLoadProjects = (state: GlobalStore) => state.loadProjects;
export const selectProjectsLoadingStatus = (state: GlobalStore) =>
  state.projects;
export const selectLoadProjectDetails = (state: GlobalStore) =>
  state.loadProjectDetails;
export const selectProjects = (state: GlobalStore) =>
  state.projects?.data?.projects;
export const selectProject = (id?: number) => (state: GlobalStore) => {
  if (!id) {
    return;
  }

  return selectProjects(state)?.[id];
};
export const selectProjectPageDetails =
  (id?: number) =>
  (state: GlobalStore): ProjectDetailsDto | undefined => {
    if (!id) {
      return;
    }

    const projectDetails = state.projectDetails?.[id];
    if (projectDetails?.data?.id) {
      return projectDetails.data;
    }

    return selectProject(id)?.(state);
  };
