import { ProjectDetailsDto } from "@models/project-dto.model";

import { projectSidebarStyles } from "./projectSidebar.styles";
import { SidebarBoxGeneral } from "./sidebarBoxGeneral/SidebarBoxGeneral";
import { SidebarBoxEvents } from "./sidebarBoxEvents/SidebarBoxEvents";
import { SidebarBoxSponsors } from "./sidebarBoxSponsors/SidebarBoxSponsors";
import { Box } from "@mui/material";
import { SidebarBoxLinks } from "./sidebarBoxLinks/SidebarBoxLinks";
import { SidebarBoxGalleries } from "./sidebarBoxGalleries/SidebarBoxGalleries";

export interface ProjectSidebarProps {
  project?: ProjectDetailsDto;
}

export const ProjectSidebar: React.FC<ProjectSidebarProps> = ({ project }) => {
  return (
    <Box
      className="project-sidebar"
      data-testid="project-sidebar"
      sx={projectSidebarStyles}
    >
      <SidebarBoxGeneral data={project?.general}></SidebarBoxGeneral>

      <SidebarBoxGalleries data={project?.images}></SidebarBoxGalleries>

      <SidebarBoxEvents data={project?.events}></SidebarBoxEvents>

      {/* <SidebarBoxShare data={project?.sharing}></SidebarBoxShare> */}

      <SidebarBoxLinks navItems={project?.main_navigation}></SidebarBoxLinks>

      <SidebarBoxSponsors
        data={project?.partners}
        type="partners"
      ></SidebarBoxSponsors>

      <SidebarBoxSponsors
        data={project?.sponsors}
        type="sponsors"
      ></SidebarBoxSponsors>
    </Box>
  );
};
