import { MFApi } from "@api/axios/mfApi";
import { GetPageListResponse } from "@api/axios/pageApi";
import { PageDtoVariant } from "@models/page/page-dto-variant.model";
import { initializationStoreActions } from "@src/store/initialization/initialization.actions";
import { pagesStoreActions } from "@src/store/pages/pages.actions";
import { getFilterHash } from "@src/store/pages/pages.selectors";
import { isValidArray } from "@utils/functions/isValidArray";
import { useCallback } from "react";

interface UsePagesApiOutput {
  loadPage: (path: string) => Promise<PageDtoVariant | true | Error>;

  loadPageListItems: (params: {
    offset?: number;
    limit?: number;
    projectId?: number;
    sortBy?: string[];
    templates?: string[];
    hashes?: { index: number; id: number; hash?: string }[];
  }) => Promise<GetPageListResponse | true | Error>;

  initialize: () => Promise<void>;
}

export const usePagesApi = (): UsePagesApiOutput => {
  const loadPage = useCallback(
    async (path: string): Promise<PageDtoVariant | true | Error> => {
      try {
        const response = await MFApi.getPage(path);

        if (response.status === 204) {
          return true;
        }

        const page = response.data as PageDtoVariant;

        pagesStoreActions.addPage(path, page);

        return page ?? true;
      } catch (error) {
        console.error("Error in data fetch:", error);
        return error as Error;
      }
    },
    []
  );

  const loadPageListItems = useCallback(
    async (params: {
      offset?: number;
      limit?: number;
      projectId?: number;
      sortBy?: string[];
      templates?: string[];
      hashes?: { index: number; id: number; hash?: string }[];
    }): Promise<GetPageListResponse | true | Error> => {
      try {
        const requestParams: { [key: string]: unknown } = {
          offset: params?.offset,
          limit: params?.limit,
          hashes: params?.hashes,
          templates: params?.templates,
        };

        const response = await MFApi.getPageListItems(
          params?.projectId,
          requestParams
        );

        if (response.status === 204) {
          return true;
        }

        const items = response.data?.items;
        if (isValidArray(items)) {
          const indexKey = params?.projectId ? `${params.projectId}` : "global";
          const filterHash = getFilterHash(params?.templates, params?.sortBy);

          pagesStoreActions.addPageCards(items, {
            indexKey,
            filterHash,
            startIndex: params?.offset || 0,
          });
          // TODO: indexData löschen, wenn sie nicht mehr zur Response hier passt. Ganzes Item löschen, wenn kein indexData mehr da ist.
        }

        return response.data ?? true;
      } catch (error) {
        console.error("Error in data fetch:", error);
        return error as Error;
      }
    },
    []
  );

  const initialize = useCallback(async () => {
    initializationStoreActions.setPartInitialized("pages");
  }, []);

  return { loadPage, loadPageListItems, initialize };
};
