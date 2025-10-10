import { PageDtoVariant } from "@models/page/page-dto-variant.model";
import { projectPageStyles } from "./projectPage.styles";
import { useGlobalStore } from "@src/store/global.store";
import { useEffect, useMemo } from "react";
import { ProjectSidebar } from "./projectSidebar/ProjectSidebar";
import { getProjectCssVars } from "./functions/getProjectCssVars";
import {
  selectResetGlobalCss,
  selectSetGlobalCss,
} from "@src/store/settings.store";
import { Box, Paper, Typography } from "@mui/material";
import {
  selectLoadProjectDetails,
  selectProjectPageDetails,
} from "@src/store/projects.store";
import { LazyPicture } from "@components/lazyPicture/LazyPicture";
import { Link } from "react-router";

export interface ProjectPageProps {
  page?: PageDtoVariant;
  children?: React.ReactNode;
}

export const ProjectPage: React.FC<ProjectPageProps> = ({ page, children }) => {
  const projectPage = useGlobalStore(
    selectProjectPageDetails(page?.project_id)
  );
  const loadProjectDetails = useGlobalStore(selectLoadProjectDetails);
  const setGlobalCss = useGlobalStore(selectSetGlobalCss);
  const resetGlobalCss = useGlobalStore(selectResetGlobalCss);

  const cssVars = useMemo(() => getProjectCssVars(projectPage), [projectPage]);

  useEffect(() => {
    if (cssVars) {
      setGlobalCss(cssVars);
    }

    return () => {
      resetGlobalCss();
    };
  }, [cssVars, resetGlobalCss, setGlobalCss]);

  // useEffect(() => {
  //   console.log("projectPage", { projectPage });
  // }, [projectPage]);

  useEffect(() => {
    if (!projectPage?.id) {
      return;
    }
    loadProjectDetails(projectPage.id);
  }, [loadProjectDetails, projectPage?.id]);

  if (!projectPage?.id) {
    return children;
  }

  return (
    <Box
      className="project-page"
      data-testid="project-page"
      sx={[projectPageStyles, cssVars]}
    >
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
        <Box
          className="project-main-content"
          data-testid="project-main-content"
        >
          {children}
        </Box>

        <Box className="project-sidebar-wrapper">
          <ProjectSidebar project={projectPage}></ProjectSidebar>
        </Box>
      </Box>
    </Box>
  );
};
