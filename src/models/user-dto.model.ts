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
  nickname?: string;
  isLoggedIn?: boolean;
  roles?: RoleDto[];
  permissions?: PermissionDto[];
  hash?: string;
}
