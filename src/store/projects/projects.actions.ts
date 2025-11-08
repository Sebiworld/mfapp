import { MFApi } from "@api/axios/mfApi";
import { useGlobalStore } from "../global.store";
import { LoadingStatus } from "@models/loading-status.model";
import { PageDtoVariant } from "@models/page/page-dto-variant.model";
import { ProjectDetailsDto } from "@models/project-dto.model";
import axios from "axios";
import { initializationStoreActions } from "../initialization/initialization.actions";

const loadProjects = async () => {
  useGlobalStore.setState((state) => ({
    projects: { ...state.projects, status: "loading" },
  }));
  try {
    const params: { [key: string]: unknown } = {};
    const hash = useGlobalStore.getState().projects?.data?.hash;
    if (hash) {
      params.hash = hash;
    }

    const response = await MFApi.getProjects(params);
    const projectsObject = response.data;

    if (response.status === 204) {
      useGlobalStore.setState((state) => ({
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

    useGlobalStore.setState((state) => ({
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
      useGlobalStore.setState((state) => ({
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
      useGlobalStore.setState((state) => ({
        projects: {
          ...state.projects,
          status: "error",
          name: (error as { message?: string })?.message || "Unknown",
        },
      }));
    }
  }
};

const loadProjectDetails = async (id: number) => {
  useGlobalStore.setState((state) => {
    const stateChanges = {
      projectDetails: { ...state.projectDetails },
    };
    const change = { status: "loading" };

    if (!stateChanges.projectDetails[id]?.status) {
      stateChanges.projectDetails[id] = change as LoadingStatus<PageDtoVariant>;
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
    const hash = useGlobalStore.getState().projectDetails?.[id]?.data?.hash;
    if (hash) {
      params.hash = hash;
    }

    const response = await MFApi.getProjectDetails(id, params);
    const page = response.data;

    if (response.status === 204) {
      useGlobalStore.setState((state) => {
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

    useGlobalStore.setState((state) => {
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
      useGlobalStore.setState((state) => {
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
      useGlobalStore.setState((state) => {
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
};

const initializeProjects = async () => {
  await loadProjects();

  initializationStoreActions.setPartInitialized("projects");
};

const resetProjects = async () => {
  useGlobalStore.setState((state) => {
    state.projects = {
      status: "uninitialized",
    };
    state.projectDetails = {};
    return state;
  });

  await initializeProjects();
};

export const projectsStoreActions = {
  loadProjects,
  loadProjectDetails,
  initializeProjects,
  resetProjects,
};
