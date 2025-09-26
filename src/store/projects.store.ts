import { PageDtoVariant } from "@models/page/page-dto-variant.model";
import { StateCreator } from "zustand";
import { GlobalStore } from "./global.store";
import { MFApi } from "@api/axios/mfApi";
import { LoadingStatus } from "@models/loading-status.model";
import axios from "axios";
import { ProjectDetailsDto } from "@models/project-dto.model";
import { GetProjectsResponse } from "@api/axios/projectsApi";
import { isValidObject } from "@utils/functions/isValidObject";

export interface ProjectsState {
  projects: LoadingStatus<GetProjectsResponse>;
  projectDetails: { [key: number]: LoadingStatus<ProjectDetailsDto> };
}

export interface ProjectsActions {
  loadProjects: () => Promise<void>;
  loadProjectDetails: (id: number) => Promise<void>;

  initializeProjects: () => Promise<void>;
  resetProjects: () => Promise<void>;
}

export type ProjectsSlice = ProjectsState & ProjectsActions;

export const createProjectsSlice: StateCreator<
  GlobalStore,
  [],
  [],
  ProjectsSlice
> = (set, get) => ({
  projects: {
    status: "uninitialized",
  },
  projectDetails: {},

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

  initializeProjects: async () => {
    const loadProjects = get().loadProjects;
    await loadProjects();

    const setPartInitialized = get().setPartInitialized;
    setPartInitialized("projects");
  },

  resetProjects: async () => {
    set((state) => {
      state.projects = {
        status: "uninitialized",
      };
      state.projectDetails = {};
      return state;
    });

    const initializeProjects = get().initializeProjects;
    await initializeProjects();
  },
});
export const selectLoadProjects = (state: GlobalStore) => state.loadProjects;
export const selectProjectsLoadingStatus = (state: GlobalStore) =>
  state.projects;
export const selectLoadProjectDetails = (state: GlobalStore) =>
  state.loadProjectDetails;
export const selectProjects = (state: GlobalStore) =>
  state.projects?.data?.projects;
export const selectProjectColors = (state: GlobalStore) => {
  const projects = selectProjects(state);

  if (!isValidObject(projects)) {
    return undefined;
  }

  return Object.values(projects).reduce((acc, curr) => {
    if (curr?.color) {
      acc.push(`#${curr.color}`);
    }
    return acc;
  }, [] as string[]);
};
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
