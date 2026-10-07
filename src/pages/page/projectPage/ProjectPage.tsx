import { PageDto } from "@models/page/page-dto.model";
import { projectPageStyles } from "./projectPage.styles";
import { useGlobalStore } from "@src/store/global.store";
import { useEffect, useMemo } from "react";
import { ProjectSidebar } from "./projectSidebar/ProjectSidebar";
import { Box, Paper, SxProps, Theme, Typography } from "@mui/material";
import {
  selectProjectCssVars,
  selectProjectPageDetails,
} from "@src/store/projects/projects.selectors";
import { LazyPicture } from "@components/lazyPicture/LazyPicture";
import { LazyPictureSize } from "@components/lazyPicture/components/LazyPictureWithoutFallback";
import { Link } from "react-router";
import { useShallow } from "zustand/shallow";
import { Alerts } from "@components/alerts/Alerts";
import { AlertDto } from "@models/utility-types/alert-dto.model";
import { isValidArray } from "@utils/functions/isValidArray";
import { configurationStoreActions } from "@src/store/configuration/configuration.actions";
import { useProjectsApi } from "@api/hooks/useProjectsApi";
import { loadSharedProjectDetails } from "@api/prefetch/projectDetailsPrefetch";
import { parseHtml } from "@utils/functions/parseHtml";
import { convertHtmlEntities } from "@utils/functions/convertHtmlEntities";
import { useTranslation } from "react-i18next";

/** The project header image spans the viewport up to the 1600px content limit; widest first. */
const PROJECT_IMAGE_SIZES: LazyPictureSize[] = [
  { media: "xl-up", width: 1600 },
  { media: "lg-up", width: 1536 },
  { media: "md-up", width: 1200 },
  { media: "sm-up", width: 900 },
  { width: 600 },
];

/** The header image is the largest visible element on load, so it must not wait for lazy loading. */
const PROJECT_IMAGE_PROPS = {
  loading: "eager",
  fetchPriority: "high",
} as const;

export interface ProjectPageProps {
  /** `template` decides the title level: only the project start page has no heading of its own. */
  page?: Pick<PageDto, "project_id" | "alerts"> & {
    template?: { name?: string };
  };
  children?: React.ReactNode;
}

export const ProjectPage: React.FC<ProjectPageProps> = ({ page, children }) => {
  const { t } = useTranslation();
  const { loadProjectDetails } = useProjectsApi();

  const projectPage = useGlobalStore(
    selectProjectPageDetails(page?.project_id)
  );

  const cssVars = useGlobalStore(
    useShallow(selectProjectCssVars(page?.project_id))
  );

  useEffect(() => {
    if (cssVars) {
      configurationStoreActions.setGlobalCss(cssVars);
    }

    return () => {
      configurationStoreActions.resetGlobalCss();
    };
  }, [cssVars]);

  useEffect(() => {
    if (!projectPage?.id) {
      return;
    }

    // Shared with the page, which may have started this request before its first render.
    void loadSharedProjectDetails(loadProjectDetails, projectPage.id);
  }, [loadProjectDetails, projectPage?.id]);

  const pageStyles = useMemo((): SxProps<Theme> => {
    if (!cssVars) {
      return projectPageStyles;
    }

    return [projectPageStyles, cssVars];
  }, [cssVars]);

  const alerts = useMemo(() => {
    const output: AlertDto[] = [];

    if (isValidArray(projectPage?.alerts) && projectPage.alerts.length) {
      output.push(...projectPage.alerts);
    }

    if (isValidArray(page?.alerts) && page.alerts.length) {
      output.push(...page.alerts);
    }

    return output;
  }, [page, projectPage]);

  const title = useMemo(() => {
    if (!projectPage?.title) {
      return null;
    }

    return parseHtml(projectPage.title);
  }, [projectPage]);

  // The header image link has no text of its own, so the project title names it.
  const mainImageLinkLabel = useMemo(() => {
    if (!projectPage?.title) {
      return undefined;
    }

    const plainTitle = convertHtmlEntities(
      projectPage.title.replace(/<[^>]*>/g, "")
    ).trim();

    return t("project_page.main_image_link", { title: plainTitle });
  }, [projectPage, t]);

  const infoOverlay = useMemo(() => {
    if (!projectPage?.info_overlay) {
      return null;
    }

    return parseHtml(projectPage.info_overlay);
  }, [projectPage]);

  const shortDescription = useMemo(() => {
    if (!projectPage?.short_description) {
      return null;
    }

    return parseHtml(projectPage.short_description);
  }, [projectPage]);

  const project = projectPage?.id ? projectPage : undefined;
  const isProjectStartPage = page?.template?.name === "project";

  // One element tree for every page, with or without project: the project arrives after the page on a first
  // visit, and a different tree would mount the page contents (and their requests) a second time.
  return (
    <Box
      className={project ? "project-page" : undefined}
      data-testid={project ? "project-page" : undefined}
      sx={project ? pageStyles : undefined}
    >
      {project && (
        <Box className="project-header" data-testid="project-header">
          <Box
            className="main-image aspect-ratio ar-3-1"
            component={Link}
            to={project.url}
            aria-label={mainImageLinkLabel}
          >
            <LazyPicture
              image={project.main_image}
              className="ar-content"
              sizes={PROJECT_IMAGE_SIZES}
              imageProps={PROJECT_IMAGE_PROPS}
            ></LazyPicture>
          </Box>

          <Box className="project-subheader">
            {project.info_overlay && (
              <Paper color="projectPrimary" className="project-teaser">
                {infoOverlay}
              </Paper>
            )}

            <Box className="project-meta">
              <Typography
                className="project-title"
                variant="h3"
                component={isProjectStartPage ? "h1" : "h3"}
              >
                {title}
              </Typography>

              {project.short_description && (
                <Typography className="project-description">
                  {shortDescription}
                </Typography>
              )}
            </Box>

            <Box className="project-menu empty"></Box>
          </Box>
        </Box>
      )}

      <Box className={project ? "layout-wrapper" : undefined}>
        {project && (
          <Box className="project-sidebar-wrapper">
            <ProjectSidebar project={project}></ProjectSidebar>
          </Box>
        )}

        <Box
          className={project ? "project-main-content" : undefined}
          data-testid={project ? "project-main-content" : undefined}
        >
          {!!alerts?.length && <Alerts alerts={alerts}></Alerts>}

          {children}
        </Box>
      </Box>
    </Box>
  );
};
