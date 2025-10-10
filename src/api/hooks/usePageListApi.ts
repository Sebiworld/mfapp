import { MFApi } from "@api/axios/mfApi";
import { GetPageListResponse } from "@api/axios/pageListApi";
import { useGlobalStore } from "@src/store/global.store";
import { selectAddPageCards } from "@src/store/pageCards.store";
import { useCallback } from "react";

export interface PageListPositioning {
  lastElementIndex: number;
  moreAvailable: boolean;
  totalNumber: number;
}

interface UsePageListApiOutput {
  loadArticles: (
    projectId?: number,
    offset?: number,
    limit?: number,
    hashes?: { index: number; id: number; hash?: string }[]
  ) => Promise<GetPageListResponse | true | Error>;
}

export const usePageListApi = (): UsePageListApiOutput => {
  const addPageCards = useGlobalStore(selectAddPageCards);

  const loadArticles = useCallback(
    async (
      projectId?: number,
      offset?: number,
      limit?: number,
      hashes?: { index: number; id: number; hash?: string }[]
    ): Promise<GetPageListResponse | true | Error> => {
      try {
        const params: { [key: string]: unknown } = {
          offset,
          limit,
          hashes,
        };

        const response = await MFApi.getArticles(projectId, params);

        if (response.status === 204) {
          return true;
        }

        const articles = response.data?.items;
        if (articles) {
          addPageCards(articles);
        }

        return response.data ?? true;
      } catch (error) {
        console.error("Error in data fetch:", error);
        return error as Error;
      }
    },
    [addPageCards]
  );

  return { loadArticles };
};
