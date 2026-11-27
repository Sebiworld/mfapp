import { useLayoutEffect, useRef } from "react";
import { ProjectDetailsDto } from "@models/project-dto.model";
import { usePlayOncePerSession } from "@utils/hooks/usePlayOncePerSession";
import { getBranchDelays } from "./getBranchDelays";

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
import { SidebarBoxLinksModal } from "./sidebarBoxLinks/components/SidebarBoxLinksModal";
import { SidebarBoxSponsorsModal } from "./sidebarBoxSponsors/components/SidebarBoxSponsorsModal";

export interface ProjectSidebarProps {
  project?: ProjectDetailsDto;
}

/** Box titles whose underlines branch off the sidebar edge. */
const BOX_TITLE_SELECTOR = ".sidebar-box > .box-title";

/**
 * Measures when each box title underline branches off and stores it as `--d` on the title.
 * @param sidebar Desktop sidebar element.
 */
const setBranchDelays = (sidebar: HTMLElement): void => {
  const titles = [...sidebar.querySelectorAll<HTMLElement>(BOX_TITLE_SELECTOR)];
  const sidebarRect = sidebar.getBoundingClientRect();
  const delays = getBranchDelays(
    titles.map(
      (title) => title.getBoundingClientRect().bottom - sidebarRect.top
    ),
    sidebarRect.height
  );

  for (const [index, title] of titles.entries()) {
    title.style.setProperty("--d", `${delays[index]}ms`);
  }
};

/**
 * Project sidebar: boxes on desktop, buttons opening modals on mobile. Once per project and session the desktop
 * edge draws down like a pen and each box title underline branches off when the edge reaches it.
 * @param props Project to show, see `ProjectSidebarProps`.
 * @returns Desktop and mobile sidebar.
 */
export const ProjectSidebar: React.FC<ProjectSidebarProps> = ({ project }) => {
  const desktopRef = useRef<HTMLDivElement>(null);
  const endedRef = useRef(new Set<EventTarget>());

  const { phase, isPaused, onAnimationEnd } = usePlayOncePerSession({
    scope: "project-sidebar",
    key: project?.id ? String(project.id) : undefined,
    targetRef: desktopRef,
  });

  // Measured again at the start, as box contents may have arrived since arming.
  useLayoutEffect(() => {
    const sidebar = desktopRef.current;

    if (phase === "static" || !sidebar) {
      return;
    }

    endedRef.current.clear();
    setBranchDelays(sidebar);
  }, [phase, project]);

  const desktopClasses = ["project-sidebar"];

  if (phase === "armed") {
    desktopClasses.push("is-armed");
  }

  if (phase === "playing") {
    desktopClasses.push("is-playing");
  }

  if (isPaused) {
    desktopClasses.push("is-paused");
  }

  return (
    <>
      <Box
        ref={desktopRef}
        className={desktopClasses.join(" ")}
        data-testid="project-sidebar"
        sx={projectSidebarStyles}
        onAnimationEnd={(event) => {
          const sidebar = event.currentTarget;
          const target = event.target;

          // The edge is the sidebar's own pseudo element; each underline belongs to its title.
          if (
            target !== sidebar &&
            !(target instanceof Element && target.matches(BOX_TITLE_SELECTOR))
          ) {
            return;
          }

          endedRef.current.add(target);

          // The last underline may end after the edge, so the motion ends once all of them are drawn.
          const titleCount =
            sidebar.querySelectorAll(BOX_TITLE_SELECTOR).length;

          if (
            endedRef.current.has(sidebar) &&
            endedRef.current.size > titleCount
          ) {
            onAnimationEnd();
          }
        }}
      >
        <SidebarBoxGeneral data={project?.general}></SidebarBoxGeneral>

        <SidebarBoxGalleries data={project?.images}></SidebarBoxGalleries>

        <SidebarBoxEvents
          data={project?.events}
          projectUrl={project?.url}
        ></SidebarBoxEvents>

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

        <SidebarBoxEventsModal
          data={project?.events}
          projectUrl={project?.url}
        ></SidebarBoxEventsModal>

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
