import { GetMenuesResponse } from "@api/axios/configApi";
import { MFApi } from "@api/axios/mfApi";
import { ConfigurationDto } from "@models/utility-types/configuration-dto.model";
import { configurationStoreActions } from "@src/store/configuration/configuration.actions";
import { initializationStoreActions } from "@src/store/initialization/initialization.actions";
import { isValidObject } from "@utils/functions/isValidObject";
import { useCallback } from "react";

interface UseConfigurationApiOutput {
  loadConfigurationParams: (params: {
    hash?: string;
  }) => Promise<ConfigurationDto | true | Error>;

  loadMenues: (params: {
    hash?: string;
  }) => Promise<GetMenuesResponse | true | Error>;

  initializeConfiguration: () => Promise<void>;
}

export const useConfigurationApi = (): UseConfigurationApiOutput => {
  const loadConfigurationParams = useCallback(
    async (params: {
      hash?: string;
    }): Promise<ConfigurationDto | true | Error> => {
      try {
        const requestParams: { [key: string]: unknown } = {
          hash: params?.hash,
        };

        const response = await MFApi.getConfiguration(requestParams);

        if (response.status === 204) {
          return true;
        }

        const configurationParamsObject = response.data;

        if (isValidObject(configurationParamsObject)) {
          configurationStoreActions.setConfigurationParams(
            configurationParamsObject
          );
        }

        return configurationParamsObject ?? true;
      } catch (error) {
        console.error("Error in data fetch:", error);
        return error as Error;
      }
    },
    []
  );

  const loadMenues = useCallback(
    async (params: {
      hash?: string;
    }): Promise<GetMenuesResponse | true | Error> => {
      try {
        const requestParams: { [key: string]: unknown } = {
          hash: params?.hash,
        };

        const response = await MFApi.getMenues(requestParams);

        if (response.status === 204) {
          return true;
        }

        const menuesObject = response.data;

        if (isValidObject(menuesObject)) {
          configurationStoreActions.setMenues(menuesObject);
        }

        return menuesObject ?? true;
      } catch (error) {
        console.error("Error in data fetch:", error);
        return error as Error;
      }
    },
    []
  );

  const initializeConfiguration = async () => {
    await loadConfigurationParams({});
    await loadMenues({});

    initializationStoreActions.setPartInitialized("configuration");
  };

  return {
    loadConfigurationParams,
    loadMenues,
    initializeConfiguration,
  };
};
