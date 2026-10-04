import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { ImageDto } from "@models/image-dto.model";
import { PageCardDto } from "@models/page/page-card-dto.model";
import { i18n } from "@utils/i18n/i18n";
import { SidebarBoxGalleriesModal } from "../SidebarBoxGalleriesModal";

vi.mock("@components/lazyPicture/LazyPicture", () => ({
  LazyPicture: () => <span />,
}));

const IMAGES = ["probe-1.jpg", "probe-2.jpg"].map(
  (basename) =>
    ({
      basename,
      name: basename,
      description: basename,
      page_id: 4711,
      ext: "jpg",
      width: 1200,
      height: 800,
      modified: 1,
      filesize: 2,
    }) as ImageDto
);

// A gallery without its own page: its images open the lightbox.
const DATA = {
  galleries: [{ id: 1, images: IMAGES } as unknown as PageCardDto],
  galleries_count: 1,
};

describe("SidebarBoxGalleriesModal", () => {
  it("keeps the modal open while the lightbox is shown and closes it after the lightbox", async () => {
    render(<SidebarBoxGalleriesModal data={DATA} />);
    const modalButton = screen.getByRole("button", {
      name: i18n.t("project.galleries.title"),
    });

    modalButton.focus();
    fireEvent.click(modalButton);
    fireEvent.click(await screen.findByTitle("probe-2.jpg in Galerie öffnen"));

    await waitFor(() =>
      expect(document.querySelector(".lg-container.lg-show")).not.toBeNull()
    );
    // Some time for an unwanted close of the modal or the lightbox.
    await new Promise((resolve) => setTimeout(resolve, 300));
    expect(document.querySelector(".lg-container.lg-show")).not.toBeNull();
    expect(screen.getByTestId("sidebar-box-galleries-modal")).toBeInTheDocument();
    // The lightbox takes the focus, and the modal does not pull it back.
    await waitFor(() =>
      expect(
        document
          .querySelector(".lg-container")
          ?.contains(document.activeElement)
      ).toBe(true)
    );
    await new Promise((resolve) => setTimeout(resolve, 200));
    expect(
      document.querySelector(".lg-container")?.contains(document.activeElement)
    ).toBe(true);

    fireEvent.keyDown(document.activeElement ?? document.body, {
      key: "Escape",
      keyCode: 27,
    });

    await waitFor(() =>
      expect(screen.queryByTestId("sidebar-box-galleries-modal")).toBeNull()
    );
    expect(document.querySelector(".lg-container.lg-show")).toBeNull();
    await waitFor(() => expect(document.activeElement).toBe(modalButton));
  });

  it("closes the modal when a slide links to the gallery page", async () => {
    const data = {
      galleries: [
        {
          id: 1,
          url: "/projekte/annie/galerien/premiere/",
          images: IMAGES,
        } as unknown as PageCardDto,
      ],
      galleries_count: 1,
    };
    // One route for both paths: the sidebar stays mounted across the navigation, like on a project page.
    const router = createMemoryRouter(
      [{ path: "*", element: <SidebarBoxGalleriesModal data={data} /> }],
      { initialEntries: ["/projekte/annie/"] }
    );
    render(<RouterProvider router={router} />);

    fireEvent.click(
      screen.getByRole("button", { name: i18n.t("project.galleries.title") })
    );
    const slides = await screen.findAllByTitle("probe-1.jpg in Galerie öffnen");
    fireEvent.click(slides[0]);

    await waitFor(() =>
      expect(router.state.location.pathname).toBe(
        "/projekte/annie/galerien/premiere/"
      )
    );
    await waitFor(() =>
      expect(screen.queryByTestId("sidebar-box-galleries-modal")).toBeNull()
    );
    expect(document.querySelector(".lg-container")).toBeNull();
  });
});
