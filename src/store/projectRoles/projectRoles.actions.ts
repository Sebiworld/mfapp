import { isValidObject } from "@utils/functions/isValidObject";
import { useGlobalStore } from "../global.store";

import { GetProjectRolesResponse } from "@api/axios/projectRolesApi";

const setProjectRoles = (
  _rootId: number,
  projectRolesResponse: GetProjectRolesResponse
) => {
  useGlobalStore.setState((state) => {
    const stateChanges = {
      roles: { ...state.roles },
      casts: { ...state.casts },
      seasons: { ...state.seasons },
      portraits: { ...state.portraits },
    };

    if (isValidObject(projectRolesResponse.roles)) {
      for (const roleData of Object.values(projectRolesResponse.roles)) {
        if (!roleData?.id) {
          continue;
        }

        stateChanges.roles[roleData.id] = roleData;
      }
    }

    if (isValidObject(projectRolesResponse.casts)) {
      for (const castData of Object.values(projectRolesResponse.casts)) {
        if (!castData?.id) {
          continue;
        }

        stateChanges.casts[castData.id] = castData;
      }
    }

    if (isValidObject(projectRolesResponse.seasons)) {
      for (const seasonData of Object.values(projectRolesResponse.seasons)) {
        if (!seasonData?.id) {
          continue;
        }

        stateChanges.seasons[seasonData.id] = seasonData;
      }
    }

    if (isValidObject(projectRolesResponse.portraits)) {
      for (const portraitData of Object.values(
        projectRolesResponse.portraits
      )) {
        if (!portraitData?.id) {
          continue;
        }

        stateChanges.portraits[portraitData.id] = portraitData;
      }
    }

    return stateChanges;
  });
};

const resetSlice = () => {
  useGlobalStore.setState((state) => {
    state.roles = {};
    state.casts = {};
    state.seasons = {};
    state.portraits = {};

    return state;
  });
};

export const projectRolesStoreActions = {
  setProjectRoles,
  resetSlice,
};
