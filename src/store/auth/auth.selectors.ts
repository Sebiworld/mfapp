import { PermissionDto, RoleDto } from "@models/user-dto.model";
import { GlobalStore } from "../global.store";

export const selectCurrentUser = (state: GlobalStore) => state.user;
export const selectIsLoggedIn = (state: GlobalStore) =>
  !!state.user?.data?.isLoggedIn;
export const selectRoles = (state: GlobalStore): RoleDto[] =>
  state.user?.data?.roles || [];
export const selectPermissions = (state: GlobalStore): PermissionDto[] =>
  state.user?.data?.permissions || [];
export const selectUserHash = (state: GlobalStore) => state.user?.data?.hash;

export const selectNickname = (state: GlobalStore) => state.nickname;

export const selectRefreshToken = (state: GlobalStore) => state.refreshToken;
export const selectAccessToken = (state: GlobalStore) => state.accessToken;
