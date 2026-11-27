import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { ReactElement } from "react";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { i18n } from "@utils/i18n/i18n";
import { SidebarBoxEventsModal } from "../sidebarBoxEvents/SidebarBoxEventsModal";
import { SidebarBoxGalleriesModal } from "../sidebarBoxGalleries/SidebarBoxGalleriesModal";
import { SidebarBoxGeneralModal } from "../sidebarBoxGeneral/SidebarBoxGeneralModal";
import { SidebarBoxLinksModal } from "../sidebarBoxLinks/components/SidebarBoxLinksModal";
import { SidebarBoxShareModal } from "../sidebarBoxShare/SidebarBoxShareModal";
import { SidebarBoxSponsorsModal } from "../sidebarBoxSponsors/components/SidebarBoxSponsorsModal";

// The box contents are not under test; a button inside proves that the content is rendered in the dialog.
vi.mock("../sidebarBoxEvents/SidebarBoxEvents", () => ({
  SidebarBoxEvents: () => <button type="button">Inhalt</button>,
}));
vi.mock("../sidebarBoxGalleries/SidebarBoxGalleries", () => ({
  SidebarBoxGalleries: () => <button type="button">Inhalt</button>,
}));
vi.mock("../sidebarBoxGeneral/SidebarBoxGeneral", () => ({
  SidebarBoxGeneral: () => <button type="button">Inhalt</button>,
}));
vi.mock("../sidebarBoxLinks/SidebarBoxLinks", () => ({
  SidebarBoxLinks: () => <button type="button">Inhalt</button>,
}));
vi.mock("../sidebarBoxShare/SidebarBoxShare", () => ({
  SidebarBoxShare: () => <button type="button">Inhalt</button>,
}));
vi.mock("../sidebarBoxSponsors/SidebarBoxSponsors", () => ({
  SidebarBoxSponsors: () => <button type="button">Inhalt</button>,
}));

interface ModalCase {
  name: string;
  testId: string;
  buttonLabel: string;
  element: ReactElement;
}

// Casts: only the fields the modals check for content are set.
const CASES: ModalCase[] = [
  {
    name: "events",
    testId: "sidebar-box-events-modal",
    buttonLabel: "project.events.title",
    element: (
      <SidebarBoxEventsModal
        data={{ performances: [{}] } as never}
        projectUrl="/projekte/x/"
      />
    ),
  },
  {
    name: "galleries",
    testId: "sidebar-box-galleries-modal",
    buttonLabel: "project.galleries.title",
    element: <SidebarBoxGalleriesModal data={{ galleries: [{}] } as never} />,
  },
  {
    name: "general",
    testId: "sidebar-box-general-modal",
    buttonLabel: "project.general_data",
    element: <SidebarBoxGeneralModal data={[{}] as never} />,
  },
  {
    name: "links",
    testId: "sidebar-box-links-modal",
    buttonLabel: "project.links",
    element: <SidebarBoxLinksModal navItems={[{}] as never} />,
  },
  {
    name: "share",
    testId: "sidebar-box-share-modal",
    buttonLabel: "project.share",
    element: <SidebarBoxShareModal data={[{}] as never} />,
  },
  {
    name: "sponsors",
    testId: "sidebar-box-sponsors-modal",
    buttonLabel: "project.sponsors",
    element: <SidebarBoxSponsorsModal data={[{}] as never} />,
  },
];

describe("sidebar box modals", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each(CASES)(
    "$name: fades the dialog in and out, moves focus in and returns it on Escape",
    ({ testId, buttonLabel, element }) => {
      render(
        <ThemeProvider
          theme={{ [THEME_ID]: mfTheme }}
          noSsr
          defaultMode="light"
        >
          {element}
        </ThemeProvider>
      );
      const opener = screen.getByRole("button", { name: i18n.t(buttonLabel) });

      opener.focus();
      fireEvent.click(opener);

      const dialog = document.querySelector<HTMLElement>(
        `[data-testid="${testId}"] .modal-container`
      )!;

      expect(dialog).toHaveAttribute("data-motion", "enter");
      expect(dialog).toHaveAttribute("tabindex", "-1");
      expect(dialog).toHaveFocus();

      fireEvent.keyDown(dialog, { key: "Escape" });

      expect(dialog).toHaveAttribute("data-motion", "exit");
      expect(document.body).toContainElement(dialog);

      act(() => {
        vi.advanceTimersByTime(150);
      });

      expect(screen.queryByTestId(testId)).toBeNull();
      expect(opener).toHaveFocus();
    }
  );
});
