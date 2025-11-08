import { ImageDto } from "./image-dto.model";

export interface PermissionDto {
  id: number;
  name: string;
  title: string;
}

export interface RoleDto {
  id: number;
  name: string;
  title: string;
  description?: string;
  project_id?: number;
}

export interface UserDto {
  id: string;
  name: string;
  nickname?: string;
  first_name?: string;
  last_name?: string;
  main_image?: ImageDto;
  isLoggedIn?: boolean;
  roles?: RoleDto[];
  permissions?: PermissionDto[];
  hash?: string;
}
