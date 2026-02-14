import { PermissionDto, RoleDto } from "@models/user-dto.model";
import { GlobalStore } from "../global.store";

export const selectCurrentUser = (state: GlobalStore) => state.user;
export const selectIsLoggedIn = (state: GlobalStore) =>
  !!state.user?.isLoggedIn;
export const selectRoles = (state: GlobalStore): RoleDto[] =>
  state.user?.roles || [];
export const selectPermissions = (state: GlobalStore): PermissionDto[] =>
  state.user?.permissions || [];
export const selectUserHash = (state: GlobalStore) => state.user?.hash;

export const selectNickname = (state: GlobalStore) => state.nickname;

export const selectRefreshToken = (state: GlobalStore) => state.refreshToken;
export const selectAccessToken = (state: GlobalStore) => state.accessToken;
