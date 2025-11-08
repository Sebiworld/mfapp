import { useGlobalStore } from "../global.store";

const setGlobalCss = (vars: { [key: string]: string | number }) =>
  useGlobalStore.setState((state) => {
    state.globalCss = vars;
    return state;
  });

const resetGlobalCss = () =>
  useGlobalStore.setState((state) => {
    state.globalCss = undefined;
    return state;
  });

export const settingsStoreActions = {
  setGlobalCss,
  resetGlobalCss,
};
