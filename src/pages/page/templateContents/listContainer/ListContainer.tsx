import { PageCard } from "@components/pageCard/PageCard";
import { Box, Pagination, PaginationItem } from "@mui/material";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePageListApi } from "@api/hooks/usePageListApi";
import { useGlobalStore } from "@src/store/global.store";
import { selectPageCards } from "@src/store/pageCards.store";
import { useShallow } from "zustand/shallow";
import { Link, useLocation, useSearchParams } from "react-router";
import { LoadingOverlay } from "@components/loadingOverlay/LoadingOverlay";
import { ListContainerPageDto } from "@models/page/list-container-page-dto.model";
import { listContainerStyles } from "./listContainer.styles";

const pageSize = 12;

interface ListContainerProps {
  page?: ListContainerPageDto;
  templates?: string[]; // Optional prop to filter by template names
}

export const ListContainer: FC<ListContainerProps> = ({ page, templates }) => {
  const { loadPageListItems } = usePageListApi();
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

  const items = useGlobalStore(
    useShallow(
      selectPageCards({
        projectId: page?.project_id,
        offset,
        limit: pageSize,
        templates, // Pass the template names for filtering
      })
    )
  );

  const [totalCount, setTotalCount] = useState<number>();
  const pageCount = useMemo(() => {
    return totalCount ? Math.ceil(totalCount / pageSize) : 1;
  }, [totalCount]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loadListHandler = useCallback(
    async (offset: number = 0, limit: number = pageSize) => {
      if (isLoading) {
        return;
      }

      setIsLoading(true);

      // Determine the offset for the next request
      const requestHashes = items
        .slice(offset, offset + pageSize)
        .map((item, index) => ({
          index: index,
          id: item.id,
          hash: item.hash,
        }));

      const response = await loadPageListItems({
        projectId: page?.project_id,
        offset,
        limit,
        templates,
        hashes: requestHashes,
      });
      setIsLoading(false);

      if (response instanceof Error || response === true) {
        return;
      }

      setTotalCount(response.totalNumber);

      scrollToTop();
    },
    [isLoading, items, loadPageListItems, page?.project_id, templates]
  );

  useEffect(() => {
    loadListHandler(0, 0); // Load Meta
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const offset = (currentPage - 1) * pageSize;
    loadListHandler(offset, pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const scrollToTop = () => {
    if (!containerRef.current) {
      return;
    }

    containerRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

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
