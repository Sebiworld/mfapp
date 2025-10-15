import { MFApi } from "@api/axios/mfApi";
import { GetPageListResponse } from "@api/axios/pageListApi";
import { useGlobalStore } from "@src/store/global.store";
import { getFilterHash, selectAddPageCards } from "@src/store/pageCards.store";
import { isValidArray } from "@utils/functions/isValidArray";
import { useCallback } from "react";

export interface PageListPositioning {
  lastElementIndex: number;
  moreAvailable: boolean;
  totalNumber: number;
}

interface UsePageListApiOutput {
  loadPageListItems: (params: {
    offset?: number;
    limit?: number;
    projectId?: number;
    sortBy?: string[];
    templates?: string[];
    hashes?: { index: number; id: number; hash?: string }[];
  }) => Promise<GetPageListResponse | true | Error>;
}

export const usePageListApi = (): UsePageListApiOutput => {
  const addPageCards = useGlobalStore(selectAddPageCards);

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

          addPageCards(
            items.map((item, index) => ({
              ...item,
              indexData: {
                [indexKey]: {
                  [filterHash]: (params?.offset || 0) + index,
                },
              },
            }))
          );

          // TODO: indexData löschen, wenn sie nicht mehr zur Response hier passt. Ganzes Item löschen, wenn kein indexData mehr da ist.
        }

        return response.data ?? true;
      } catch (error) {
        console.error("Error in data fetch:", error);
        return error as Error;
      }
    },
    [addPageCards]
  );

  return { loadPageListItems };
};
