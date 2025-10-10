import { PageCard } from "@components/pageCard/PageCard";
import { ArticlesContainerPageDto } from "@models/page/articles-container-page-dto.model";
import { Box, Link, Pagination, PaginationItem } from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
import { articlesContainerStyles } from "./articlesContainer.styles";
import { PageListPositioning, usePageListApi } from "@api/hooks/usePageListApi";
import { useGlobalStore } from "@src/store/global.store";
import {
  selectArticles,
  selectResetPageCards,
} from "@src/store/pageCards.store";
import { useShallow } from "zustand/shallow";

const requestLimit = 12;

interface ArticlesContainerProps {
  page?: ArticlesContainerPageDto;
}

export const ArticlesContainer: FC<ArticlesContainerProps> = ({ page }) => {
  const { loadArticles } = usePageListApi();
  const resetPageCards = useGlobalStore(selectResetPageCards);
  const items = useGlobalStore(useShallow(selectArticles(page?.project_id)));

  const [pageListPositioning, setPageListPositioning] =
    useState<PageListPositioning>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loadNextArticles = useCallback(async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    // Determine the offset for the next request
    const offset = pageListPositioning?.lastElementIndex || 0;
    // const requestHashes = items
    //   .slice(offset, offset + requestLimit)
    //   .map((item, index) => ({
    //     index: index,
    //     id: item.id,
    //     hash: item.hash,
    //   }));

    const response = await loadArticles(
      page?.project_id,
      offset || undefined,
      requestLimit
      // requestHashes
    );
    setIsLoading(false);

    if (response instanceof Error || response === true) {
      return;
    }

    setPageListPositioning({
      lastElementIndex: response.lastElementIndex,
      moreAvailable: response.moreAvailable,
      totalNumber: response.totalNumber,
    });
  }, [
    isLoading,
    loadArticles,
    page?.project_id,
    pageListPositioning?.lastElementIndex,
  ]);

  useEffect(() => {
    resetPageCards(page?.project_id, "article");
    loadNextArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("Current Positioning: ", pageListPositioning);
  }, [pageListPositioning]);

  useEffect(() => {
    console.log("Items changed", items);
  }, [items]);

  return (
    <Box className="articles-container" sx={articlesContainerStyles}>
      <Pagination
        count={10}
        color="primary"
        shape="rounded"
        variant="outlined"
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            href=""
            // search={{ page: item.page }}
            {...item}
          />
        )}
      />

      <Box className="items-container">
        {items?.map((item) => (
          <PageCard key={item.id} card={item} />
        ))}
      </Box>

      <Pagination
        count={10}
        color="primary"
        shape="rounded"
        variant="outlined"
      />
    </Box>
  );
};
