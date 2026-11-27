import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render } from "@testing-library/react";
import { ReactElement } from "react";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { ProjectDetailsDto } from "@models/project-dto.model";
import {
  endAnimation,
  resetMatchMedia,
  setReducedMotion,
  stubIntersectionObserver,
} from "@src/test/motion";

// Loaded fresh for every test: the splash signal and the played motions live in module state.
let markSplashGone: () => void;
let ProjectSidebar: typeof import("../ProjectSidebar").ProjectSidebar;

// Two desktop boxes with a title, the rest without content; the modal buttons of the mobile sidebar render nothing.
vi.mock("../sidebarBoxGeneral/SidebarBoxGeneral", () => ({
  SidebarBoxGeneral: () => (
    <div className="sidebar-box">
      <h3 className="box-title" data-bottom="100">
        Allgemein
      </h3>
    </div>
  ),
}));
vi.mock("../sidebarBoxLinks/SidebarBoxLinks", () => ({
  SidebarBoxLinks: () => (
    <div className="sidebar-box">
      <h3 className="box-title" data-bottom="300">
        Links
      </h3>
    </div>
  ),
}));
vi.mock("../sidebarBoxGalleries/SidebarBoxGalleries", () => ({
  SidebarBoxGalleries: () => null,
}));
vi.mock("../sidebarBoxEvents/SidebarBoxEvents", () => ({
  SidebarBoxEvents: () => null,
}));
vi.mock("../sidebarBoxSponsors/SidebarBoxSponsors", () => ({
  SidebarBoxSponsors: () => null,
}));
vi.mock("../sidebarBoxGeneral/SidebarBoxGeneralModal", () => ({
  SidebarBoxGeneralModal: () => null,
}));
vi.mock("../sidebarBoxGalleries/SidebarBoxGalleriesModal", () => ({
  SidebarBoxGalleriesModal: () => null,
}));
vi.mock("../sidebarBoxEvents/SidebarBoxEventsModal", () => ({
  SidebarBoxEventsModal: () => null,
}));
vi.mock("../sidebarBoxLinks/components/SidebarBoxLinksModal", () => ({
  SidebarBoxLinksModal: () => null,
}));
vi.mock("../sidebarBoxSponsors/components/SidebarBoxSponsorsModal", () => ({
  SidebarBoxSponsorsModal: () => null,
}));

const PHASE_CLASSES = ["is-armed", "is-playing", "is-paused"];
const SIDEBAR_HEIGHT = 400;

/**
 * Builds a project.
 * @param id Project id.
 * @returns The project.
 */
const project = (id: number): ProjectDetailsDto =>
  ({ id, name: `projekt-${id}` }) as ProjectDetailsDto;

/**
 * Wraps the sidebar in the app theme.
 * @param value Project to show, or none.
 * @returns The element to render.
 */
const themed = (value?: ProjectDetailsDto): ReactElement => (
  <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
    <ProjectSidebar project={value} />
  </ThemeProvider>
);

/**
 * Lists the phase classes on an element.
 * @param element Sidebar element.
 * @returns Phase classes present on it.
 */
const phaseOf = (element: Element): string[] =>
  PHASE_CLASSES.filter((name) => element.classList.contains(name));

/**
 * Finds the desktop sidebar.
 * @param container Render container.
 * @returns The desktop `.project-sidebar`.
 */
const desktopIn = (container: Element): Element =>
  container.querySelector(".project-sidebar:not(.mobile)") as Element;

/**
 * Finds the mobile sidebar.
 * @param container Render container.
 * @returns The `.project-sidebar.mobile`.
 */
const mobileIn = (container: Element): Element =>
  container.querySelector(".project-sidebar.mobile") as Element;

/**
 * Builds a rect that only has a vertical position.
 * @param top Top edge.
 * @param bottom Bottom edge.
 * @returns The rect.
 */
const rect = (top: number, bottom: number): DOMRect =>
  ({
    top,
    bottom,
    height: bottom - top,
    left: 0,
    right: 0,
    width: 0,
    x: 0,
    y: top,
    toJSON: () => ({}),
  }) as DOMRect;

describe("ProjectSidebar", () => {
  beforeEach(async () => {
    vi.resetModules();
    ({ markSplashGone } = await import("@core/splashScreen/splashSignal"));
    ({ ProjectSidebar } = await import("../ProjectSidebar"));
    setReducedMotion(false);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    resetMatchMedia();
  });

  it("draws the lines once per project and session", () => {
    const { report } = stubIntersectionObserver();
    const first = render(themed(project(3)));

    expect(phaseOf(desktopIn(first.container))).toEqual(["is-armed"]);

    act(() => markSplashGone());
    act(() => report(true));
    expect(phaseOf(desktopIn(first.container))).toEqual(["is-playing"]);
    first.unmount();

    const again = render(themed(project(3)));
    expect(phaseOf(desktopIn(again.container))).toEqual([]);

    again.rerender(themed(project(4)));
    expect(phaseOf(desktopIn(again.container))).toEqual(["is-armed"]);
  });

  it("ends once the edge and every branch are drawn", () => {
    const { report } = stubIntersectionObserver();
    const { container } = render(themed(project(3)));
    const desktop = desktopIn(container);

    act(() => markSplashGone());
    act(() => report(true));

    const titles = desktop.querySelectorAll(".box-title");

    endAnimation(desktop);
    endAnimation(titles[0]);
    expect(phaseOf(desktop)).toEqual(["is-playing"]);

    endAnimation(titles[1]);
    expect(phaseOf(desktop)).toEqual([]);
  });

  it("sets the branch delay on every box title", () => {
    stubIntersectionObserver();
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
      function (this: HTMLElement) {
        // Sidebar from 50 to 450; each title reports its bottom relative to the sidebar via data-bottom.
        if (this.classList.contains("project-sidebar")) {
          return rect(50, 50 + SIDEBAR_HEIGHT);
        }

        const bottom = Number(this.dataset.bottom ?? 0) + 50;

        return rect(bottom - 30, bottom);
      }
    );

    const { container } = render(themed(project(3)));
    const titles = [...desktopIn(container).querySelectorAll(".box-title")];

    expect(titles).toHaveLength(2);
    expect(
      titles.map((title) =>
        (title as HTMLElement).style.getPropertyValue("--d")
      )
    ).toEqual(["130ms", "390ms"]);
  });

  it("leaves the mobile sidebar without lines", () => {
    const { observed, report } = stubIntersectionObserver();
    const { container } = render(themed(project(3)));

    act(() => markSplashGone());
    act(() => report(true));

    expect(phaseOf(mobileIn(container))).toEqual([]);
    expect(observed).toEqual([desktopIn(container)]);
  });

  it("shows the lines at once with reduced motion", () => {
    setReducedMotion(true);
    stubIntersectionObserver();
    const { container } = render(themed(project(3)));

    expect(phaseOf(desktopIn(container))).toEqual([]);
  });

  it("shows the lines at once without a project", () => {
    stubIntersectionObserver();
    const { container } = render(themed());

    expect(phaseOf(desktopIn(container))).toEqual([]);
  });
});
