import { useGlobalStore } from "../global.store";
import { UserDto } from "@models/user-dto.model";

const setNickname = (nickname?: string) => {
  useGlobalStore.setState({
    nickname,
  });
};

const setUser = async (user: UserDto | undefined) => {
  useGlobalStore.setState({
    user,
  });
};

const setRefreshToken = async (refreshToken: string) => {
  useGlobalStore.setState({
    refreshToken,
  });
};

const setAccessToken = async (accessToken: string, refreshToken: string) => {
  useGlobalStore.setState({
    accessToken,
    refreshToken,
  });
};

const resetSlice = async () => {
  useGlobalStore.setState((state) => {
    state.accessToken = undefined;
    state.refreshToken = undefined;
    state.user = undefined;
    return state;
  });
};

export const authStoreActions = {
  setNickname,
  setUser,
  setRefreshToken,
  setAccessToken,
  resetSlice,
};
