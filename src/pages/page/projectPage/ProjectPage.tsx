import { PageDtoVariant } from "@models/page/page-dto-variant.model";
import { projectPageStyles } from "./projectPage.styles";
import { AspectRatio, Box, Card, Typography } from "@mui/joy";
import { useGlobalStore } from "@src/store/global.store";
import {
  selectLoadProjectDetails,
  selectProjectPageDetails,
} from "@src/store/pages.store";
import { useEffect, useMemo } from "react";
import { ProjectSidebar } from "./projectSidebar/ProjectSidebar";
import { LazyPicture } from "@components/lazyPicture/LazyPicture";
import { Link } from "@tanstack/react-router";
import { getProjectCssVars } from "./functions/getProjectCSSVars";
import {
  selectResetGlobalCss,
  selectSetGlobalCss,
} from "@src/store/settings.store";

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

  useEffect(() => {
    console.log("projectPage", { projectPage });
  }, [projectPage]);

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
      sx={{ ...projectPageStyles, ...cssVars }}
    >
      <Box className="project-header" data-testid="project-header">
        <Box className="main-image" component={Link} to={projectPage.url}>
          <AspectRatio ratio="11/4" variant="soft">
            {projectPage?.main_image?.basename ? (
              <LazyPicture image={projectPage.main_image}></LazyPicture>
            ) : (
              <img src="/img/mf-bg.jpg"></img>
            )}
          </AspectRatio>
        </Box>

        <Box className="project-subheader">
          {projectPage?.info_overlay && (
            <Card
              color="projectPrimary"
              variant="solid"
              className="project-teaser"
              dangerouslySetInnerHTML={{ __html: projectPage.info_overlay }}
            ></Card>
          )}

          <Box className="project-meta">
            <Typography className="project-title" level="h3">
              {projectPage.title}
            </Typography>
            <Typography className="project-description">
              {projectPage.short_description}
            </Typography>
          </Box>

          <Box className="project-menu"></Box>
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
