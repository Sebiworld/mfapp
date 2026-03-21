import { StateCreator } from "zustand";
import { GlobalStore } from "../global.store";

import { ProjectDetailsDto, ProjectDto } from "@models/project-dto.model";

export interface ProjectsSlice {
  projects: { [key: number]: ProjectDto };
  projectsHash?: string;

  projectDetails: { [key: number]: ProjectDetailsDto };
}

export const createProjectsSlice: StateCreator<
  GlobalStore,
  [],
  [],
  ProjectsSlice
> = () => ({
  projects: {},
  projectDetails: {},
});
