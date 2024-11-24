import { Box, Sheet, Typography } from "@mui/joy";
import { SectionsContainer } from "@components/sections/SectionsContainer";
import { ContentBlocks } from "@components/contentBlocks/ContentBlocks";
import { pageContentsStyles } from "./pageContents.styles";
import { DefaultPageDto } from "@models/page/default-page-dto.model";
import { PageDtoVariant } from "@models/page/page-dto-variant.model";

export interface PagesContentsProps {
  page?: PageDtoVariant;
}

export const PageContents: React.FC<PagesContentsProps> = ({ page }) => {
  if (!page?.id) {
    return null;
  }

  return (
    <Box
      className="page-contents"
      data-testid="page-contents"
      sx={pageContentsStyles}
    >
      {page?.template?.name !== "home" && (
        <Sheet variant="soft" className="page-content">
          {page?.template?.name !== "project" && (
            <Typography level="h1">{page.title}</Typography>
          )}

          {!!(page as DefaultPageDto)?.contents?.length && (
            <ContentBlocks
              blocks={(page as DefaultPageDto).contents}
            ></ContentBlocks>
          )}
        </Sheet>
      )}

      {!!(page as DefaultPageDto)?.sections?.length && (
        <SectionsContainer sections={(page as DefaultPageDto).sections} />
      )}
    </Box>
  );
};
