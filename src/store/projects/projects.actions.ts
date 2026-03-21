import { useGlobalStore } from "../global.store";
import { ProjectDetailsDto, ProjectDto } from "@models/project-dto.model";

const setProjectsData = (
  projects: { [key: number]: ProjectDto },
  hash?: string
) => {
  useGlobalStore.setState((_state) => {
    const stateChanges = {
      projects: projects,
      projectsHash: hash || undefined,
    };

    return stateChanges;
  });
};

const setProjectDetailsData = (
  id: number,
  projectDetail: ProjectDetailsDto
) => {
  useGlobalStore.setState((state) => {
    const stateChanges = {
      projectDetails: {
        ...state.projectDetails,
        [id]: projectDetail,
      },
    };

    return stateChanges;
  });
};

const resetSlice = () => {
  useGlobalStore.setState((state) => {
    state.projects = {};
    state.projectsHash = undefined;
    state.projectDetails = {};
    return state;
  });
};

export const projectsStoreActions = {
  setProjectsData,
  setProjectDetailsData,
  resetSlice,
};
