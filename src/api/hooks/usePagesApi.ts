import { SessionChangedError, watchSession } from "@api/session/watchSession";
import { MFApi } from "@api/axios/mfApi";
import { GetPageListResponse } from "@api/axios/pageApi";
import { PageDtoVariant } from "@models/page/page-dto-variant.model";
import { initializationStoreActions } from "@src/store/initialization/initialization.actions";
import { pagesStoreActions } from "@src/store/pages/pages.actions";
import { getFilterHash } from "@src/store/pages/pages.selectors";
import { isValidArray } from "@utils/functions/isValidArray";
import { useCallback } from "react";
import { useGlobalStore } from "@src/store/global.store";
import { pageUnlocksStoreActions } from "@src/store/pageUnlocks/pageUnlocks.actions";
import { selectPageUnlockKey } from "@src/store/pageUnlocks/pageUnlocks.selectors";

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

/**
 * Keeps the key store in line with a page response: a key delivered with an opened page is kept (it comes from the
 * account when it differs from the stored one), and a page that stays locked drops its key, since the API no longer
 * accepts it (password changed). The password form is shown again then, without another request.
 * @param page Page as delivered by the API.
 */
const storeUnlockOfResponse = (page: PageDtoVariant): void => {
  if (!page?.id) {
    return;
  }

  if (page.locked) {
    pageUnlocksStoreActions.removePageUnlock(page.id);
    return;
  }

  if (!page.unlock_key || typeof page.expires !== "number") {
    return;
  }

  const stored = useGlobalStore.getState().pageUnlocks?.[page.id];

  if (stored?.key === page.unlock_key) {
    return;
  }

  pageUnlocksStoreActions.setPageUnlock(
    page.id,
    page.unlock_key,
    page.expires,
    "account"
  );
};

export const usePagesApi = (): UsePagesApiOutput => {
  const loadPage = useCallback(
    async (path: string): Promise<PageDtoVariant | true | Error> => {
      try {
        pageUnlocksStoreActions.removeExpiredPageUnlocks();

        const isSameSession = watchSession();
        const storedId = useGlobalStore.getState().pages[path]?.id;
        const sentKey = selectPageUnlockKey(storedId)(
          useGlobalStore.getState()
        );
        let response = await MFApi.getPage(
          path,
          sentKey ? { unlock: sentKey } : undefined
        );

        if (!isSameSession()) {
          return new SessionChangedError();
        }

        if (response.status === 204) {
          return true;
        }

        let page = response.data as PageDtoVariant | undefined;

        // Without a stored copy the id is only known now; a key kept for it is sent once more.
        const laterKey = page?.locked
          ? selectPageUnlockKey(page.id)(useGlobalStore.getState())
          : undefined;

        if (page?.locked && laterKey && laterKey !== sentKey) {
          response = await MFApi.getPage(path, { unlock: laterKey });

          if (!isSameSession()) {
            return new SessionChangedError();
          }

          if (response.status === 204) {
            return true;
          }

          page = response.data as PageDtoVariant | undefined;
        }

        if (page) {
          storeUnlockOfResponse(page);
          pagesStoreActions.addPage(path, page);
        }

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

        const isSameSession = watchSession();
        const response = await MFApi.getPageListItems(
          params?.projectId,
          requestParams
        );

        if (!isSameSession()) {
          return new SessionChangedError();
        }

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
