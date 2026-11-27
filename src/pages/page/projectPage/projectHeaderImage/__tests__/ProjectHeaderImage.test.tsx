import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { ReactElement } from "react";
import { MemoryRouter } from "react-router";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { ProjectDetailsDto } from "@models/project-dto.model";
import { LazyPictureProps } from "@components/lazyPicture/LazyPicture";
import {
  endAnimation,
  resetMatchMedia,
  setReducedMotion,
  stubIntersectionObserver,
} from "@src/test/motion";

// Loaded fresh for every test: the splash signal and the played motions live in module state.
let markSplashGone: () => void;
let ProjectHeaderImage: typeof import("../ProjectHeaderImage").ProjectHeaderImage;

vi.mock("@components/lazyPicture/LazyPicture", () => ({
  LazyPicture: ({ className, imageProps }: LazyPictureProps) => (
    <figure className={className}>
      <picture>
        <img
          src="/header.jpg"
          alt=""
          data-testid="header-img"
          {...imageProps}
        />
      </picture>
    </figure>
  ),
}));

vi.mock("../projectHeaderAnimations", () => ({
  PROJECT_HEADER_ANIMATIONS: {
    annie: () =>
      Promise.resolve({
        default: ({ onEnd }: { onEnd: () => void }) => (
          <button
            type="button"
            data-testid="custom-animation"
            onClick={onEnd}
          />
        ),
      }),
  },
}));

/**
 * Builds a project with a header image.
 * @param id Project id.
 * @param name Page name of the project.
 * @returns The project.
 */
const project = (id: number, name = "medicus"): ProjectDetailsDto =>
  ({
    id,
    name,
    title: "Der Medicus",
    url: `/projekte/${name}/`,
    main_image: { basename: "header.jpg" },
  }) as ProjectDetailsDto;

/**
 * Wraps the header image in theme and router.
 * @param value Project to show.
 * @returns The element to render.
 */
const themed = (value: ProjectDetailsDto): ReactElement => (
  <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
    <MemoryRouter>
      <ProjectHeaderImage project={value} label="Zum Projekt Der Medicus" />
    </MemoryRouter>
  </ThemeProvider>
);

/**
 * Finds the header link.
 * @returns The link element.
 */
const link = (): HTMLElement =>
  screen.getByRole("link", { name: "Zum Projekt Der Medicus" });

/**
 * Brings an armed header to the start: image loaded, splash gone, in view, idle time passed.
 * @param report `report` of the stubbed observer.
 */
const startLight = (report: (isIntersecting: boolean) => void): void => {
  fireEvent.load(screen.getByTestId("header-img"));
  act(() => markSplashGone());
  act(() => report(true));
  act(() => vi.advanceTimersByTime(200));
};

describe("ProjectHeaderImage", () => {
  beforeEach(async () => {
    vi.useFakeTimers();
    vi.stubGlobal("requestIdleCallback", undefined);
    vi.resetModules();
    ({ markSplashGone } = await import("@core/splashScreen/splashSignal"));
    ({ ProjectHeaderImage } = await import("../ProjectHeaderImage"));
    setReducedMotion(false);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    resetMatchMedia();
  });

  it("keeps the header image the largest eager element", () => {
    stubIntersectionObserver();
    render(themed(project(3)));

    const img = screen.getByTestId("header-img");

    expect(img).toHaveAttribute("loading", "eager");
    expect(img).toHaveAttribute("fetchpriority", "high");
    expect(img.style.opacity).toBe("");
    expect(link()).toHaveClass("is-armed");
  });

  it("starts the light after the image has loaded and the splash is gone", () => {
    const observer = stubIntersectionObserver();
    render(themed(project(3)));

    expect(link()).toHaveClass("is-armed");

    fireEvent.load(screen.getByTestId("header-img"));

    expect(link()).toHaveClass("is-armed");

    act(() => markSplashGone());

    expect(link()).toHaveClass("is-armed");

    act(() => observer.report(true));

    expect(link()).toHaveClass("is-armed");

    act(() => vi.advanceTimersByTime(200));

    expect(link()).toHaveClass("is-playing");
    expect(link()).not.toHaveClass("is-armed");
    expect(link().querySelector(".header-light")).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  });

  it("waits for the header image to load", () => {
    const observer = stubIntersectionObserver();
    render(themed(project(3)));

    act(() => markSplashGone());
    act(() => observer.report(true));
    act(() => vi.advanceTimersByTime(200));

    expect(link()).toHaveClass("is-armed");

    fireEvent.load(screen.getByTestId("header-img"));
    act(() => vi.advanceTimersByTime(200));

    expect(link()).toHaveClass("is-playing");
  });

  it("starts without a load event when the image is already there", () => {
    vi.spyOn(HTMLImageElement.prototype, "complete", "get").mockReturnValue(
      true
    );
    const observer = stubIntersectionObserver();
    render(themed(project(3)));

    act(() => markSplashGone());
    act(() => observer.report(true));
    act(() => vi.advanceTimersByTime(200));

    expect(link()).toHaveClass("is-playing");
  });

  it("plays once per project and session", () => {
    const observer = stubIntersectionObserver();
    const first = render(themed(project(3)));

    startLight(observer.report);

    expect(link()).toHaveClass("is-playing");

    endAnimation(link().querySelector(".header-light") as Element);

    expect(link()).not.toHaveClass("is-playing");
    expect(link().querySelector(".header-motion")).toBeNull();

    first.unmount();
    const again = render(themed(project(3)));

    expect(link()).not.toHaveClass("is-armed");
    expect(link()).not.toHaveClass("is-playing");

    again.unmount();
    render(themed(project(4)));

    expect(link()).toHaveClass("is-armed");
  });

  it("pauses the light while the header is off screen", () => {
    const observer = stubIntersectionObserver();
    render(themed(project(3)));

    startLight(observer.report);
    act(() => observer.report(false));

    expect(link()).toHaveClass("is-playing");
    expect(link()).toHaveClass("is-paused");
  });

  it("shows only the image with reduced motion", () => {
    stubIntersectionObserver();
    setReducedMotion(true);
    render(themed(project(3)));

    expect(screen.getByTestId("header-img")).toBeInTheDocument();
    expect(link().querySelector(".header-motion")).toBeNull();
    expect(link()).not.toHaveClass("is-armed");
    expect(link()).not.toHaveClass("is-playing");
  });

  it("hands the header to a registered project animation", async () => {
    const observer = stubIntersectionObserver();
    render(themed(project(5, "annie")));

    startLight(observer.report);

    vi.useRealTimers();
    const custom = await screen.findByTestId("custom-animation");

    expect(link().querySelector(".header-light")).toBeNull();
    expect(link()).not.toHaveClass("with-light");

    fireEvent.click(custom);

    expect(link()).not.toHaveClass("is-playing");
    expect(screen.queryByTestId("custom-animation")).toBeNull();
  });

  it("keeps the link to the project", () => {
    stubIntersectionObserver();
    render(themed(project(3)));

    expect(link()).toHaveAttribute("href", "/projekte/medicus/");
  });
});
