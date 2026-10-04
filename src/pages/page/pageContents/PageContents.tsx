/* eslint-disable react-hooks/preserve-manual-memoization */
import { SectionsContainer } from "@components/sections/SectionsContainer";
import { ContentBlocks } from "@components/contentBlocks/ContentBlocks";
import { pageContentsStyles } from "./pageContents.styles";
import { DefaultPageDto } from "@models/page/default-page-dto.model";
import { PageDtoVariant } from "@models/page/page-dto-variant.model";
import { Box, Paper, Typography } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { formatDate } from "@utils/functions/formatDate";
import { isValidArray } from "@utils/functions/isValidArray";
import { ListContainerPageDto } from "@models/page/list-container-page-dto.model";
import React from "react";
import { parseHtml } from "@utils/functions/parseHtml";
import { NextPerformanceCard } from "@components/nextPerformanceCard/NextPerformanceCard";
import {
  GalleryImageLinkContext,
  getGalleryImageSlots,
} from "@components/contentBlocks/variants/contentGallery/galleryImageLink";

/** The home page only points to performances that are at most this many days away. */
const HOME_MAX_DAYS_AHEAD = 30;

const ProjectRole = React.lazy(() =>
  import("../templateContents/projectRole/ProjectRole").then((module) => ({
    default: module.ProjectRole,
  }))
);
const ListContainer = React.lazy(() =>
  import("../templateContents/listContainer/ListContainer").then((module) => ({
    default: module.ListContainer,
  }))
);

export interface PagesContentsProps {
  page?: PageDtoVariant;
}

export const PageContents: React.FC<PagesContentsProps> = ({ page }) => {
  const { t } = useTranslation();

  // useEffect(() => {
  //   console.log("page", page);
  // }, [page]);

  const defaultPage = useMemo(() => page as DefaultPageDto, [page]);

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

  const title = useMemo(() => {
    if (!defaultPage?.title) {
      return null;
    }

    return parseHtml(defaultPage.title);
  }, [defaultPage?.title]);

  const intro = useMemo(() => {
    if (!defaultPage?.intro) {
      return null;
    }

    return parseHtml(defaultPage.intro);
  }, [defaultPage?.intro]);

  const creationDate = useMemo(() => {
    if (!defaultPage?.datetime_from) {
      return null;
    }

    if (authors) {
      return parseHtml(
        t("page.published-on-by", {
          date: formatDate(defaultPage.datetime_from * 1000),
          date_raw: formatDate(defaultPage.datetime_from * 1000, "yyyy-MM-dd"),
          authors,
        })
      );
    }

    return parseHtml(
      t("page.published-on", {
        date: formatDate(defaultPage.datetime_from * 1000),
        date_raw: formatDate(defaultPage.datetime_from * 1000, "yyyy-MM-dd"),
      })
    );
  }, [authors, defaultPage?.datetime_from, t]);

  const galleryImageSlots = useMemo(
    () => getGalleryImageSlots(defaultPage?.contents),
    [defaultPage?.contents]
  );

  // On the home page the next performance card follows a leading hero, which sits below the translucent header.
  const homeHero =
    page?.template?.name === "home" &&
    defaultPage?.sections?.[0]?.type === "hero"
      ? defaultPage.sections[0]
      : null;
  const sections = (defaultPage?.sections ?? []).filter(
    (section) => section !== homeHero
  );

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
      {/* The hero carries the name only as artwork, so the home page needs its level-one heading for assistive tech. */}
      {page?.template?.name === "home" && (
        <Typography
          variant="h1"
          className="visually-hidden"
          data-testid="home-heading"
        >
          {t("home.heading")}
        </Typography>
      )}

      {page?.template?.name === "project" && !!page.project_id && (
        <NextPerformanceCard projectId={page.project_id} />
      )}

      {page?.template?.name !== "home" && (
        <Paper className="page-content" elevation={0}>
          {page?.template?.name !== "project" && (
            <Box className="page-header">
              {!!showCreationDate && !!creationDate && (
                <Typography variant="subtitle1" className="creation-date">
                  {creationDate}
                </Typography>
              )}

              <Typography variant="h1" className="page-title">
                {title}
              </Typography>
            </Box>
          )}

          {!!defaultPage.intro && <Box className="intro">{intro}</Box>}

          {!!defaultPage?.contents?.length && (
            <GalleryImageLinkContext.Provider value={galleryImageSlots}>
              <ContentBlocks blocks={defaultPage.contents}></ContentBlocks>
            </GalleryImageLinkContext.Provider>
          )}
        </Paper>
      )}

      {!!(
        defaultPage?.template?.name === "project_role" ||
        defaultPage?.template?.name === "project_roles_container"
      ) && <ProjectRole id={defaultPage?.id} />}

      {defaultPage?.template?.name === "galleries_container" && (
        <ListContainer
          page={page as ListContainerPageDto}
          templates={["gallery"]}
        />
      )}

      {defaultPage?.template?.name === "articles_container" && (
        <ListContainer
          page={page as ListContainerPageDto}
          templates={["article"]}
        />
      )}

      {!!homeHero && <SectionsContainer sections={[homeHero]} />}

      {page?.template?.name === "home" && (
        <NextPerformanceCard
          showProject
          centered
          strip
          maxDaysAhead={HOME_MAX_DAYS_AHEAD}
        />
      )}

      {!!sections.length && <SectionsContainer sections={sections} />}
    </Box>
  );
};
