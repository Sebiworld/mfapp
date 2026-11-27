import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { ReactElement } from "react";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { i18n } from "@utils/i18n/i18n";
import { resetMatchMedia, setReducedMotion } from "@src/test/motion";
import {
  SPLASH_EXIT_MS,
  SplashScreen,
  SplashScreenProps,
} from "../SplashScreen";
import {
  SPLASH_MESSAGE_INTERVAL_MS,
  SPLASH_MESSAGE_LEAVE_MS,
} from "../useSplashMessage";

/**
 * Wraps the splash in the app theme, which its styles read.
 * @param props Props of the splash.
 * @returns The themed element.
 */
const themed = (props: SplashScreenProps): ReactElement => (
  <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
    <SplashScreen {...props} />
  </ThemeProvider>
);

/**
 * Finds the splash root.
 * @returns The root element.
 */
const splash = (): HTMLElement => screen.getByTestId("splash-screen");

describe("SplashScreen", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    setReducedMotion(false);
  });

  afterEach(() => {
    vi.useRealTimers();
    resetMatchMedia();
  });

  it("shows no MUI progress bar any more", () => {
    render(themed({ visible: true }));

    expect(splash()).toBeInTheDocument();
    expect(screen.queryByRole("progressbar")).toBeNull();
  });

  it("starts the exit at once when the app is ready during the entrance", () => {
    const onExited = vi.fn();
    const { rerender } = render(themed({ visible: true, onExited }));

    expect(splash()).toHaveAttribute("data-phase", "shown");

    act(() => vi.advanceTimersByTime(50));
    rerender(themed({ visible: false, onExited }));

    expect(splash()).toHaveAttribute("data-phase", "exiting");
    expect(splash()).toHaveClass("is-exiting");
    expect(splash().querySelector(".curtain")).toBeNull();

    act(() => vi.advanceTimersByTime(SPLASH_EXIT_MS - 1));
    expect(screen.getByTestId("splash-screen")).toBeInTheDocument();
    expect(onExited).not.toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(1));
    expect(screen.queryByTestId("splash-screen")).toBeNull();
    expect(onExited).toHaveBeenCalledTimes(1);
  });

  it("releases scrolling at the start of the exit", () => {
    const { rerender } = render(themed({ visible: true }));

    expect(document.body).toHaveAttribute("data-scroll-locked");

    rerender(themed({ visible: false }));

    expect(splash()).toHaveAttribute("data-phase", "exiting");
    expect(document.body).not.toHaveAttribute("data-scroll-locked");
  });

  it("leaves with the same short fade under reduced motion", () => {
    setReducedMotion(true);
    const onExited = vi.fn();
    const { rerender } = render(themed({ visible: true, onExited }));

    rerender(themed({ visible: false, onExited }));

    act(() => vi.advanceTimersByTime(SPLASH_EXIT_MS - 1));
    expect(screen.getByTestId("splash-screen")).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(1));
    expect(screen.queryByTestId("splash-screen")).toBeNull();
    expect(onExited).toHaveBeenCalledTimes(1);
  });

  it("reports the splash as gone right away when it never shows", () => {
    const onExited = vi.fn();
    render(themed({ visible: false, onExited }));

    expect(screen.queryByTestId("splash-screen")).toBeNull();
    expect(onExited).toHaveBeenCalledTimes(1);
  });

  it("cross-fades the loading messages", () => {
    render(themed({ visible: true }));

    expect(screen.getByTestId("splash-message")).toHaveTextContent(
      i18n.t("splash.1")
    );

    act(() => vi.advanceTimersByTime(SPLASH_MESSAGE_INTERVAL_MS));
    const messages = screen.getAllByTestId("splash-message");
    expect(messages).toHaveLength(2);
    expect(messages[0]).toHaveClass("is-leaving");
    expect(messages[0]).toHaveTextContent(i18n.t("splash.1"));
    expect(messages[1]).toHaveClass("is-entering");

    act(() => vi.advanceTimersByTime(SPLASH_MESSAGE_LEAVE_MS));
    expect(screen.getAllByTestId("splash-message")).toHaveLength(1);
    expect(screen.getByTestId("splash-message")).toHaveTextContent(
      i18n.t("splash.2")
    );
  });

  it("keeps the maintenance splash still: no shimmer, no message change", () => {
    const { container } = render(
      themed({
        visible: true,
        variant: "maintenance",
        message: <p data-testid="maintenance-text">Kurze Pause</p>,
      })
    );

    expect(splash()).toHaveClass("variant-maintenance");
    expect(container.ownerDocument.querySelector(".logo-shimmer")).toBeNull();

    act(() => vi.advanceTimersByTime(10000));
    expect(screen.getByTestId("maintenance-text")).toHaveTextContent(
      "Kurze Pause"
    );
    expect(screen.queryByTestId("splash-message")).toBeNull();
    expect(splash()).toHaveAttribute("data-phase", "shown");
  });

  it("shows the shimmer while loading", () => {
    render(themed({ visible: true }));

    expect(splash()).toHaveClass("variant-loading");
    expect(document.querySelector(".logo-shimmer")).not.toBeNull();
  });

  it("shows no shimmer with reduced motion", () => {
    setReducedMotion(true);
    render(themed({ visible: true }));

    expect(document.querySelector(".logo-shimmer")).toBeNull();
  });

  it("offers the elapsed time of an earlier splash to every entrance delay", () => {
    render(themed({ visible: true }));

    expect(splash().style.getPropertyValue("--mf-splash-elapsed")).toBe("0ms");
  });
});
