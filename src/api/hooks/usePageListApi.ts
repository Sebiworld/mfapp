import { MFApi } from "@api/axios/mfApi";
import { useGlobalStore } from "@src/store/global.store";
import { selectSetPageCards } from "@src/store/pageCards.store";
import { useCallback } from "react";

interface UsePageListApiOutput {
  loadArticles: (
    projectId?: number,
    offset?: number,
    limit?: number
  ) => Promise<true | Error>;
}

export const usePageListApi = (): UsePageListApiOutput => {
  const setPageCards = useGlobalStore(selectSetPageCards);

  const loadArticles = useCallback(
    async (projectId?: number): Promise<true | Error> => {
      try {
        const params: { [key: string]: unknown } = {};
        // TODO: Hashes
        // const hash = get().pages?.[path]?.data?.hash;
        // if (hash) {
        //   params.hash = hash;
        // }

        const response = await MFApi.getArticles(projectId, params);
        console.log("RESPONSE", response);

        if (response.status === 204) {
          return true;
        }

        const articles = response.data?.items;
        if (articles) {
          setPageCards(articles);
        }
      } catch (error) {
        console.error("Error in data fetch:", error);
        return error as Error;
      }

      return true;
    },
    [setPageCards]
  );

  return { loadArticles };
};
