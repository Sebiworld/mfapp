import { MFApi } from "@api/axios/mfApi";
import { LoadingStatus } from "@models/loading-status.model";
import {
  ProjectRoleDto,
  ProjectRolesContainerDto,
} from "@models/project-role/project-role-dto.model";
import { isValidObject } from "@utils/functions/isValidObject";
import { useGlobalStore } from "../global.store";
import axios from "axios";
import { initializationStoreActions } from "../initialization/initialization.actions";

const loadProjectRoles = async (id: number) => {
  useGlobalStore.setState((state) => {
    const stateChanges = {
      roles: { ...state.roles },
    };
    const change = { status: "loading" };

    if (!stateChanges.roles[id]?.status) {
      stateChanges.roles[id] = change as LoadingStatus<
        ProjectRoleDto | ProjectRolesContainerDto
      >;
    } else {
      stateChanges.roles[id] = {
        ...stateChanges.roles[id],
        ...(change as LoadingStatus<ProjectRoleDto | ProjectRolesContainerDto>),
      };
    }

    return stateChanges;
  });

  try {
    const params: { [key: string]: unknown } = {};
    const hash = useGlobalStore.getState().roles?.[id]?.data?.hash;
    if (hash) {
      params.hash = hash;
    }

    const response = await MFApi.getProjectRoles(id, params);
    const responseData = response.data;

    if (!isValidObject(responseData?.roles)) {
      useGlobalStore.setState((state) => {
        const stateChanges = {
          roles: { ...state.roles },
        };
        const change = { status: "error", name: "Invalid response data" };

        if (!stateChanges.roles[id]?.status) {
          stateChanges.roles[id] = change as LoadingStatus<
            ProjectRoleDto | ProjectRolesContainerDto
          >;
        } else {
          stateChanges.roles[id] = {
            ...stateChanges.roles[id],
            ...(change as LoadingStatus<
              ProjectRoleDto | ProjectRolesContainerDto
            >),
          };
        }

        return stateChanges;
      });
      return;
    }

    if (response.status === 204) {
      useGlobalStore.setState((state) => {
        const stateChanges = {
          roles: { ...state.roles },
        };
        const change = {
          status: "success",
          name: undefined,
          code: undefined,
          statusCode: undefined,
          message: undefined,
          stack: undefined,
        };

        if (!stateChanges.roles[id]?.status) {
          stateChanges.roles[id] = change as LoadingStatus<
            ProjectRoleDto | ProjectRolesContainerDto
          >;
        } else {
          stateChanges.roles[id] = {
            ...stateChanges.roles[id],
            ...(change as LoadingStatus<
              ProjectRoleDto | ProjectRolesContainerDto
            >),
          };
        }
        return stateChanges;
      });
      return;
    }

    useGlobalStore.setState((state) => {
      const stateChanges = {
        roles: { ...state.roles },
        casts: { ...state.casts },
        seasons: { ...state.seasons },
        portraits: { ...state.portraits },
      };

      let mainIdFound = false;
      for (const roleData of Object.values(responseData.roles)) {
        if (!roleData?.id) {
          continue;
        }

        if (roleData.id === id) {
          mainIdFound = true;
        }

        const change = {
          status: "success",
          data: roleData,
          name: undefined,
          code: undefined,
          statusCode: undefined,
          message: undefined,
          stack: undefined,
        };

        if (!stateChanges.roles[roleData.id]?.status) {
          stateChanges.roles[roleData.id] = change as LoadingStatus<
            ProjectRoleDto | ProjectRolesContainerDto
          >;
        } else {
          stateChanges.roles[roleData.id] = {
            ...stateChanges.roles[roleData.id],
            ...(change as LoadingStatus<
              ProjectRoleDto | ProjectRolesContainerDto
            >),
          };
        }
      }

      if (!mainIdFound) {
        stateChanges.roles[id] = {
          status: "success",
        } as LoadingStatus<ProjectRoleDto | ProjectRolesContainerDto>;
      }

      if (isValidObject(responseData.casts)) {
        for (const castData of Object.values(responseData.casts)) {
          if (!castData?.id) {
            continue;
          }

          stateChanges.casts[castData.id] = castData;
        }
      }

      if (isValidObject(responseData.seasons)) {
        for (const seasonData of Object.values(responseData.seasons)) {
          if (!seasonData?.id) {
            continue;
          }

          stateChanges.seasons[seasonData.id] = seasonData;
        }
      }

      if (isValidObject(responseData.portraits)) {
        for (const portraitData of Object.values(responseData.portraits)) {
          if (!portraitData?.id) {
            continue;
          }

          stateChanges.portraits[portraitData.id] = portraitData;
        }
      }

      return stateChanges;
    });
  } catch (error) {
    console.error("Error in data fetch:", error);
    if (axios.isAxiosError(error)) {
      useGlobalStore.setState((state) => {
        const stateChanges = {
          roles: { ...state.roles },
        };
        const change = {
          status: "error",
          name: error.name,
          code: error.code,
          statusCode: error.status,
          message: error.message,
          stack: error.stack,
        };

        if (!stateChanges.roles[id]?.status) {
          stateChanges.roles[id] = change as LoadingStatus<
            ProjectRoleDto | ProjectRolesContainerDto
          >;
        } else {
          stateChanges.roles[id] = {
            ...stateChanges.roles[id],
            ...(change as LoadingStatus<
              ProjectRoleDto | ProjectRolesContainerDto
            >),
          };
        }
        return stateChanges;
      });
    } else {
      useGlobalStore.setState((state) => {
        const stateChanges = {
          roles: { ...state.roles },
        };
        const change = {
          status: "error",
          name: (error as { message?: string })?.message || "Unknown",
        };

        if (!stateChanges.roles[id]?.status) {
          stateChanges.roles[id] = change as LoadingStatus<
            ProjectRoleDto | ProjectRolesContainerDto
          >;
        } else {
          stateChanges.roles[id] = {
            ...stateChanges.roles[id],
            ...(change as LoadingStatus<
              ProjectRoleDto | ProjectRolesContainerDto
            >),
          };
        }
        return stateChanges;
      });
    }
  }
};

const initializeProjectRoles = async () => {
  initializationStoreActions.setPartInitialized("projectRoles");
};

const resetProjectRoles = async () => {
  useGlobalStore.setState((state) => {
    state.roles = {};
    state.casts = {};
    state.seasons = {};
    state.portraits = {};
    return state;
  });

  await initializeProjectRoles();
};

export const projectRolesStoreActions = {
  loadProjectRoles,
  initializeProjectRoles,
  resetProjectRoles,
};
