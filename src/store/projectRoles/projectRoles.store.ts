import { StateCreator } from "zustand";
import { GlobalStore } from "../global.store";

import {
  ProjectRoleDto,
  ProjectRolesContainerDto,
} from "@models/project-role/project-role-dto.model";
import { ProjectCastDto } from "@models/project-role/project-cast-dto.model";
import { ProjectSeasonDto } from "@models/project-role/project-season-dto.model";
import { ProjectPortraitDto } from "@models/project-role/project-portrait-dto.model";

export interface ProjectRolesSlice {
  roles: {
    [key: number]: ProjectRoleDto | ProjectRolesContainerDto;
  };
  casts: { [key: number]: ProjectCastDto };
  seasons: { [key: number]: ProjectSeasonDto };
  portraits: { [key: number]: ProjectPortraitDto };
}

export const createProjectRolesSlice: StateCreator<
  GlobalStore,
  [],
  [],
  ProjectRolesSlice
> = () => ({
  roles: {},
  casts: {},
  seasons: {},
  portraits: {},
});
