import { Box, Sheet, Typography } from "@mui/joy";
import { SectionsContainer } from "@components/sections/SectionsContainer";
import { ContentBlocks } from "@components/contentBlocks/ContentBlocks";
import { pageContentsStyles } from "./pageContents.styles";
import { DefaultPageDto } from "@models/page/default-page-dto.model";
import { useTranslation } from "react-i18next";
import { PageDtoVariant } from "@models/page/page-dto-variant.model";

export interface PagesContentsProps {
  page?: PageDtoVariant;
}

export const PageContents: React.FC<PagesContentsProps> = ({ page }) => {
  const { t } = useTranslation();

  return (
    <Box
      className="page-contents"
      data-testid="page-contents"
      sx={pageContentsStyles}
    >
      {page?.id ? (
        <>
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
        </>
      ) : (
        <Sheet variant="soft" className="page-content message">
          {t("no-data")}
        </Sheet>
      )}
    </Box>
  );
};
