import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import "@utils/i18n/i18n";

// Loaded fresh for every test: the splash signal lives in module state.
let markSplashGone: () => void;
let isContentPending: () => boolean;
let LoadingOverlay: typeof import("../LoadingOverlay").LoadingOverlay;

describe("LoadingOverlay", () => {
  beforeEach(async () => {
    vi.resetModules();
    ({ markSplashGone, isContentPending } =
      await import("@core/splashScreen/splashSignal"));
    ({ LoadingOverlay } = await import("../LoadingOverlay"));
  });

  const renderOverlay = (): void => {
    render(
      <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
        <LoadingOverlay visible />
      </ThemeProvider>
    );
  };

  it("waits for the splash to be gone before its delay starts", () => {
    renderOverlay();

    expect(screen.getByTestId("loading-overlay")).toHaveClass("is-waiting");

    act(() => markSplashGone());

    expect(screen.getByTestId("loading-overlay")).not.toHaveClass("is-waiting");
  });

  it("starts at once when the splash is already gone", () => {
    markSplashGone();
    renderOverlay();

    expect(screen.getByTestId("loading-overlay")).not.toHaveClass("is-waiting");
  });

  const renderWith = (props: { visible: boolean; onlyProgress?: boolean }) =>
    render(
      <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
        <LoadingOverlay {...props} />
      </ThemeProvider>
    );

  it("marks first content as pending only while the loading card shows", () => {
    const { rerender, unmount } = renderWith({ visible: true });

    expect(isContentPending()).toBe(true);

    rerender(
      <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
        <LoadingOverlay visible={false} />
      </ThemeProvider>
    );
    expect(isContentPending()).toBe(false);

    rerender(
      <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
        <LoadingOverlay visible />
      </ThemeProvider>
    );
    expect(isContentPending()).toBe(true);

    unmount();
    expect(isContentPending()).toBe(false);
  });

  it("does not hold the splash for a progress bar over content already shown", () => {
    renderWith({ visible: true, onlyProgress: true });

    expect(isContentPending()).toBe(false);
  });
});
