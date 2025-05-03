import { SectionsContainer } from "@components/sections/SectionsContainer";
import { ContentBlocks } from "@components/contentBlocks/ContentBlocks";
import { pageContentsStyles } from "./pageContents.styles";
import { DefaultPageDto } from "@models/page/default-page-dto.model";
import { PageDtoVariant } from "@models/page/page-dto-variant.model";
import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { formatDate } from "@utils/functions/formatDate";
import { isValidArray } from "@utils/functions/isValidArray";

export interface PagesContentsProps {
  page?: PageDtoVariant;
}

export const PageContents: React.FC<PagesContentsProps> = ({ page }) => {
  const { t } = useTranslation();

  useEffect(() => {
    console.log("page", page);
  }, [page]);

  const defaultPage = page as DefaultPageDto;

  const showCreationDate = useMemo(
    () => page?.template?.name && ["article"].includes(page?.template?.name),
    [page?.template?.name]
  );

  const authors = useMemo((): string => {
    if (!isValidArray(defaultPage?.authors) || !defaultPage?.authors?.length) {
      return "";
    }

    const authorNames = defaultPage?.authors.map((author) => {
      if (author?.first_name && author?.last_name) {
        return `${author?.first_name} ${author?.last_name}`;
      }

      if (author?.first_name) {
        return author?.first_name;
      }

      if (author?.last_name) {
        return author?.last_name;
      }
    });
    if (!authorNames?.length) {
      return "";
    }
    return authorNames.join(" & ");
  }, [defaultPage?.authors]);

  if (!page?.id) {
    return null;
  }

  return (
    <Box
      component="main"
      role="main"
      className="page-contents"
      data-testid="page-contents"
      sx={pageContentsStyles}
    >
      {page?.template?.name !== "home" && (
        <Paper className="page-content" elevation={0}>
          {page?.template?.name !== "project" && (
            <Box className="page-header">
              {!!showCreationDate && !!page.created && (
                <Typography
                  variant="subtitle1"
                  className="creation-date"
                  dangerouslySetInnerHTML={{
                    __html: authors
                      ? t("page.published-on-by", {
                          date: formatDate(defaultPage.datetime_from * 1000),
                          date_raw: formatDate(
                            defaultPage.datetime_from * 1000,
                            "yyyy-MM-dd"
                          ),
                          authors,
                        })
                      : t("page.published-on", {
                          date: formatDate(defaultPage.datetime_from * 1000),
                          date_raw: formatDate(
                            defaultPage.datetime_from * 1000,
                            "yyyy-MM-dd"
                          ),
                        }),
                  }}
                ></Typography>
              )}

              <Typography
                variant="h1"
                className="page-title"
                dangerouslySetInnerHTML={{ __html: page.title }}
              ></Typography>
            </Box>
          )}

          {!!defaultPage.intro && (
            <Box
              className="intro"
              dangerouslySetInnerHTML={{
                __html: defaultPage.intro,
              }}
            ></Box>
          )}

          {!!defaultPage?.contents?.length && (
            <ContentBlocks blocks={defaultPage.contents}></ContentBlocks>
          )}
        </Paper>
      )}

      {!!defaultPage?.sections?.length && (
        <SectionsContainer sections={defaultPage.sections} />
      )}
    </Box>
  );
};
