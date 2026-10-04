import { SessionChangedError, watchSession } from "@api/session/watchSession";
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

  initialize: () => Promise<void>;
}

export const useConfigurationApi = (): UseConfigurationApiOutput => {
  /**
   * Loads global configuration parameters
   */
  const loadConfigurationParams = useCallback(
    async (params: {
      hash?: string;
    }): Promise<ConfigurationDto | true | Error> => {
      try {
        const requestParams: { [key: string]: unknown } = {
          hash: params?.hash,
        };

        const isSameSession = watchSession();
        const response = await MFApi.getConfiguration(requestParams);

        if (!isSameSession()) {
          return new SessionChangedError();
        }

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

  /**
   * Loads global menu data
   */
  const loadMenues = useCallback(
    async (params: {
      hash?: string;
    }): Promise<GetMenuesResponse | true | Error> => {
      try {
        const requestParams: { [key: string]: unknown } = {
          hash: params?.hash,
        };

        const isSameSession = watchSession();
        const response = await MFApi.getMenues(requestParams);

        if (!isSameSession()) {
          return new SessionChangedError();
        }

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

  /**
   * Initializes configuration & menu data; the two requests do not depend on each other.
   */
  const initialize = useCallback(async () => {
    await Promise.all([loadConfigurationParams({}), loadMenues({})]);

    initializationStoreActions.setPartInitialized("configuration");
  }, [loadConfigurationParams, loadMenues]);

  return {
    loadConfigurationParams,
    loadMenues,
    initialize,
  };
};
