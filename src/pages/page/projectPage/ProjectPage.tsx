import { PageDtoVariant } from "@models/page/page-dto-variant.model";
import { useTranslation } from "react-i18next";
import { projectPageStyles } from "./projectPage.styles";
import { Box } from "@mui/joy";
import { useGlobalStore } from "@src/store/global.store";
import {
  selectLoadProjectDetails,
  selectProjectPageDetails,
} from "@src/store/pages.store";
import { useEffect } from "react";
import { ProjectSidebar } from "./projectSidebar/ProjectSidebar";

export interface ProjectPageProps {
  page?: PageDtoVariant;
  children?: React.ReactNode;
}

export const ProjectPage: React.FC<ProjectPageProps> = ({ page, children }) => {
  const { t } = useTranslation();

  const projectPage = useGlobalStore(
    selectProjectPageDetails(page?.project_id)
  );
  const loadProjectDetails = useGlobalStore(selectLoadProjectDetails);

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
      sx={projectPageStyles}
    >
      <Box className="project-header" data-testid="project-header">
        HEADER
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
