import { PageCard } from "@components/pageCard/PageCard";
import { Box, Pagination, PaginationItem } from "@mui/material";
import {
  FC,
  useCallback,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import { useGlobalStore } from "@src/store/global.store";
import { useShallow } from "zustand/shallow";
import { Link, useLocation, useSearchParams } from "react-router";
import { LoadingOverlay } from "@components/loadingOverlay/LoadingOverlay";
import { ListContainerPageDto } from "@models/page/list-container-page-dto.model";
import { listContainerStyles } from "./listContainer.styles";
import { usePagesApi } from "@api/hooks/usePagesApi";
import { selectPageCards } from "@src/store/pages/pages.selectors";
import { GetPageListResponse } from "@api/axios/pageApi";

const pageSize = 12;

interface ListContainerProps {
  page?: ListContainerPageDto;
  templates?: string[]; // Optional prop to filter by template names
}

export const ListContainer: FC<ListContainerProps> = ({ page, templates }) => {
  const { loadPageListItems } = usePagesApi();
  // const resetPageCards = useGlobalStore(selectResetPageCards);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const currentPageNum = searchParams?.get("page");
  const containerRef = useRef<HTMLDivElement>(null);

  const currentPage = useMemo(() => {
    if (!currentPageNum) {
      return 1;
    }

    const parsedPage = parseInt(currentPageNum, 10);

    if (isNaN(parsedPage) || parsedPage < 1) {
      return 1;
    }

    return parsedPage;
  }, [currentPageNum]);

  const offset = useMemo(() => (currentPage - 1) * pageSize, [currentPage]);
  const projectId = page?.project_id;

  // Callers pass inline arrays; a content key keeps the load effects from re-running on every parent render.
  const templatesKey = templates ? JSON.stringify(templates) : undefined;
  const stableTemplates = useMemo<string[] | undefined>(
    () => (templatesKey ? JSON.parse(templatesKey) : undefined),
    [templatesKey]
  );

  const items = useGlobalStore(
    useShallow(
      selectPageCards({
        projectId,
        offset,
        limit: pageSize,
        templates: stableTemplates, // Pass the template names for filtering
      })
    )
  );

  const [totalCount, setTotalCount] = useState<number>();
  const pageCount = useMemo(() => {
    return totalCount ? Math.ceil(totalCount / pageSize) : 1;
  }, [totalCount]);

  // Every change of list or page starts a new request; loading lasts until the newest request has answered,
  // so an earlier response (also for the same page, e.g. 1 -> 2 -> 1) cannot end it.
  const requestKey = `${projectId ?? "global"}|${templatesKey ?? ""}|${currentPage}`;
  const [request, setRequest] = useState({ key: requestKey, id: 0 });

  if (request.key !== requestKey) {
    setRequest({ key: requestKey, id: request.id + 1 });
  }

  const requestId = request.id;
  const [loadedRequestId, setLoadedRequestId] = useState<number>();
  const isLoading = loadedRequestId !== requestId;

  // Reads the cached cards at request time, so they are not a dependency of the load effects.
  const getRequestHashes = useEffectEvent((requestOffset: number) =>
    items.slice(requestOffset, requestOffset + pageSize).map((item, index) => ({
      index: index,
      id: item.id,
      hash: item.hash,
    }))
  );

  /**
   * Takes over the total number from a list response and scrolls to the list top.
   * @param response The API result of a list request; `true` (204) and errors are ignored.
   */
  const applyListResponse = useCallback(
    (response: GetPageListResponse | true | Error) => {
      if (response instanceof Error || response === true) {
        return;
      }

      setTotalCount(response.totalNumber);

      containerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    },
    []
  );

  // Meta data (total number) runs in parallel to the page request: a 204 page response carries no totalNumber.
  useEffect(() => {
    let isCurrent = true;

    const loadMeta = async () => {
      const response = await loadPageListItems({
        projectId,
        offset: 0,
        limit: 0,
        templates: stableTemplates,
        hashes: getRequestHashes(0),
      });

      if (isCurrent) {
        applyListResponse(response);
      }
    };

    loadMeta();

    return () => {
      isCurrent = false;
    };
  }, [applyListResponse, loadPageListItems, projectId, stableTemplates]);

  useEffect(() => {
    let isCurrent = true;

    const loadListPage = async () => {
      const response = await loadPageListItems({
        projectId,
        offset,
        limit: pageSize,
        templates: stableTemplates,
        hashes: getRequestHashes(offset),
      });

      // A response for a page that is no longer requested is dropped.
      if (!isCurrent) {
        return;
      }

      setLoadedRequestId(requestId);
      applyListResponse(response);
    };

    loadListPage();

    return () => {
      isCurrent = false;
    };
  }, [
    applyListResponse,
    loadPageListItems,
    offset,
    projectId,
    requestId,
    stableTemplates,
  ]);

  return (
    <Box className="list-container" sx={listContainerStyles}>
      <Box className="scroll-anchor" id="list-top" ref={containerRef}></Box>
      {/* <Pagination
        count={pageCount}
        page={currentPage}
        color="primary"
        shape="rounded"
        variant="outlined"
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={{
              pathname: location.pathname,
              search: item.page && item.page > 1 ? `?page=${item.page}` : "",
            }}
            {...item}
          />
        )}
      /> */}

      <LoadingOverlay
        visible={isLoading}
        onlyProgress={!!items?.length}
      ></LoadingOverlay>

      <Box className="items-container">
        {items?.map((item) => (
          <PageCard key={item.id} card={item} />
        ))}
      </Box>

      <Pagination
        count={pageCount}
        page={currentPage}
        color="primary"
        shape="rounded"
        variant="outlined"
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={{
              pathname: location.pathname,
              search: item.page && item.page > 1 ? `?page=${item.page}` : "",
            }}
            {...item}
          />
        )}
      />
    </Box>
  );
};
