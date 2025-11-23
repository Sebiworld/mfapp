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

const resetConfiguration = async () => {
  useGlobalStore.setState((state) => {
    state.configurationParams = undefined;
    state.menues = undefined;
    return state;
  });
};

export const configurationStoreActions = {
  setConfigurationParams,
  setMenues,
  resetConfiguration,
};
