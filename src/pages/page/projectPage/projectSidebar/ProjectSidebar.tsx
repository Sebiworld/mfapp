import { ProjectDetailsDto } from "@models/project-dto.model";
import { Box } from "@mui/joy";
import { projectSidebarStyles } from "./projectSidebar.styles";
import { SidebarBoxGeneral } from "./sidebarBoxGeneral/SidebarBoxGeneral";
import { SidebarBoxEvents } from "./sidebarBoxEvents/SidebarBoxEvents";
import { SidebarBoxSponsors } from "./sidebarBoxSponsors/SidebarBoxSponsors";

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

      <SidebarBoxEvents data={project?.events}></SidebarBoxEvents>

      {/* <SidebarBoxShare data={project?.sharing}></SidebarBoxShare> */}

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
