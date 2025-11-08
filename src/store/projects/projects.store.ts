import { StateCreator } from "zustand";
import { GlobalStore } from "../global.store";
import { LoadingStatus } from "@models/loading-status.model";

import { ProjectDetailsDto } from "@models/project-dto.model";
import { GetProjectsResponse } from "@api/axios/projectsApi";

export interface ProjectsSlice {
  projects: LoadingStatus<GetProjectsResponse>;
  projectDetails: { [key: number]: LoadingStatus<ProjectDetailsDto> };
}

export const createProjectsSlice: StateCreator<
  GlobalStore,
  [],
  [],
  ProjectsSlice
> = () => ({
  projects: {
    status: "uninitialized",
  },
  projectDetails: {},
});
