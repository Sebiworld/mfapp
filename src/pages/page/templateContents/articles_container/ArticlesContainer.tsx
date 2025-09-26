import { PageCard } from "@components/pageCard/PageCard";
import { ArticlesContainerPageDto } from "@models/page/articles-container-page-dto.model";
import { Box } from "@mui/material";
import { FC, use } from "react";
import { articlesContainerStyles } from "./articlesContainer.styles";
import { usePageListApi } from "@api/hooks/usePageListApi";

interface ArticlesContainerProps {
  page?: ArticlesContainerPageDto;
}

export const ArticlesContainer: FC<ArticlesContainerProps> = ({ page }) => {
  const { loadArticles } = usePageListApi();

  use(loadArticles());

  return (
    <Box className="articles-container" sx={articlesContainerStyles}>
      <Box className="items-container">
        {page?.items?.map((item) => (
          <PageCard key={item.id} card={item} />
        ))}
      </Box>
    </Box>
  );
};
