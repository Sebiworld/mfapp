
import { ProjectDto } from "./project-dto.model";

export interface PermissionDto {
  id: number;
  name: string;
  title: string;
}

export interface RoleDto {
  id: number;
  name: string;
  title: string;
  description: string;
}

export interface UserDto {
  id: string;
  name: string;
  email: string;
  roles?: RoleDto[];
  permissions?: PermissionDto[];
  projects?: ProjectDto[];
}
