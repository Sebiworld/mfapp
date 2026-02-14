import { ConfigurationDto } from "@models/utility-types/configuration-dto.model";
import { useGlobalStore } from "../global.store";
import { GetMenuesResponse } from "@api/axios/configApi";

const setConfigurationParams = async (
  configurationParamsResponse: ConfigurationDto
) => {
  useGlobalStore.setState({
    configurationParams: configurationParamsResponse,
  });
};

const setMenues = async (menuesResponse: GetMenuesResponse) => {
  useGlobalStore.setState({
    menues: menuesResponse,
  });
};

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

const resetSlice = async () => {
  useGlobalStore.setState((state) => {
    state.configurationParams = undefined;
    state.menues = undefined;
    state.globalCss = undefined;
    return state;
  });
};

export const configurationStoreActions = {
  setConfigurationParams,
  setMenues,
  setGlobalCss,
  resetGlobalCss,
  resetSlice,
};
