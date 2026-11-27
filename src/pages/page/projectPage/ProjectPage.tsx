import { PageDto } from "@models/page/page-dto.model";
import { projectPageStyles } from "./projectPage.styles";
import { useGlobalStore } from "@src/store/global.store";
import { useEffect, useMemo } from "react";
import { ProjectSidebar } from "./projectSidebar/ProjectSidebar";
import { ProjectHeaderImage } from "./projectHeaderImage/ProjectHeaderImage";
import { Box, Paper, SxProps, Theme, Typography } from "@mui/material";
import {
  selectProjectCssVars,
  selectProjectPageDetails,
} from "@src/store/projects/projects.selectors";
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
          <ProjectHeaderImage project={project} label={mainImageLinkLabel} />

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
