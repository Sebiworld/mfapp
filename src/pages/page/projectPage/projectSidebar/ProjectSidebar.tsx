import { ProjectDetailsDto } from "@models/project-dto.model";

import { projectSidebarStyles } from "./projectSidebar.styles";
import { SidebarBoxGeneral } from "./sidebarBoxGeneral/SidebarBoxGeneral";
import { SidebarBoxEvents } from "./sidebarBoxEvents/SidebarBoxEvents";
import { SidebarBoxSponsors } from "./sidebarBoxSponsors/SidebarBoxSponsors";
import { Box } from "@mui/material";
import { SidebarBoxLinks } from "./sidebarBoxLinks/SidebarBoxLinks";
import { SidebarBoxGalleries } from "./sidebarBoxGalleries/SidebarBoxGalleries";
import { SidebarBoxGeneralModal } from "./sidebarBoxGeneral/SidebarBoxGeneralModal";
import { SidebarBoxGalleriesModal } from "./sidebarBoxGalleries/SidebarBoxGalleriesModal";
import { SidebarBoxEventsModal } from "./sidebarBoxEvents/SidebarBoxEventsModal";
import { SidebarBoxLinksModal } from "./sidebarBoxLinks/SidebarBoxLinksModal";
import { SidebarBoxSponsorsModal } from "./sidebarBoxSponsors/SidebarBoxSponsorsModal";

export interface ProjectSidebarProps {
  project?: ProjectDetailsDto;
}

export const ProjectSidebar: React.FC<ProjectSidebarProps> = ({ project }) => {
  console.log("ProjectSidebar render", { project });
  return (
    <>
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

      <Box
        className="project-sidebar mobile"
        data-testid="project-sidebar"
        sx={projectSidebarStyles}
      >
        <SidebarBoxGeneralModal
          data={project?.general}
        ></SidebarBoxGeneralModal>

        <SidebarBoxGalleriesModal
          data={project?.images}
        ></SidebarBoxGalleriesModal>

        <SidebarBoxEventsModal data={project?.events}></SidebarBoxEventsModal>

        {/* <SidebarBoxShareModal data={project?.sharing}></SidebarBoxShareModal> */}

        <SidebarBoxLinksModal
          navItems={project?.main_navigation}
        ></SidebarBoxLinksModal>

        <SidebarBoxSponsorsModal
          data={project?.partners}
          type="partners"
        ></SidebarBoxSponsorsModal>

        <SidebarBoxSponsorsModal
          data={project?.sponsors}
          type="sponsors"
        ></SidebarBoxSponsorsModal>
      </Box>
    </>
  );
};
