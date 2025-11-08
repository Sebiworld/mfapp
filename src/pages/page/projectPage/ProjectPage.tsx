import { PageDtoVariant } from "@models/page/page-dto-variant.model";
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
import { Link } from "react-router";
import { useShallow } from "zustand/shallow";
import { projectsStoreActions } from "@src/store/projects/projects.actions";
import { settingsStoreActions } from "@src/store/settings/settings.actions";

export interface ProjectPageProps {
  page?: PageDtoVariant;
  children?: React.ReactNode;
}

export const ProjectPage: React.FC<ProjectPageProps> = ({ page, children }) => {
  const projectPage = useGlobalStore(
    selectProjectPageDetails(page?.project_id)
  );

  const cssVars = useGlobalStore(
    useShallow(selectProjectCssVars(page?.project_id))
  );

  useEffect(() => {
    if (cssVars) {
      settingsStoreActions.setGlobalCss(cssVars);
    }

    return () => {
      settingsStoreActions.resetGlobalCss();
    };
  }, [cssVars]);

  useEffect(() => {
    if (!projectPage?.id) {
      return;
    }

    projectsStoreActions.loadProjectDetails(projectPage.id);
  }, [projectPage?.id]);

  const pageStyles = useMemo((): SxProps<Theme> => {
    if (!cssVars) {
      return projectPageStyles;
    }

    return [projectPageStyles, cssVars];
  }, [cssVars]);

  if (!projectPage?.id) {
    return children;
  }

  return (
    <Box className="project-page" data-testid="project-page" sx={pageStyles}>
      <Box className="project-header" data-testid="project-header">
        <Box
          className="main-image aspect-ratio ar-3-1"
          component={Link}
          to={projectPage.url}
        >
          <LazyPicture
            image={projectPage.main_image}
            className="ar-content"
          ></LazyPicture>
        </Box>

        <Box className="project-subheader">
          {projectPage?.info_overlay && (
            <Paper
              color="projectPrimary"
              className="project-teaser"
              dangerouslySetInnerHTML={{ __html: projectPage.info_overlay }}
            ></Paper>
          )}

          <Box className="project-meta">
            <Typography className="project-title" variant="h3">
              {projectPage.title}
            </Typography>

            {projectPage.short_description && (
              <Typography className="project-description">
                {projectPage.short_description}
              </Typography>
            )}
          </Box>

          <Box className="project-menu empty"></Box>
        </Box>
      </Box>

      <Box className="layout-wrapper">
        <Box className="project-sidebar-wrapper">
          <ProjectSidebar project={projectPage}></ProjectSidebar>
        </Box>

        <Box
          className="project-main-content"
          data-testid="project-main-content"
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
