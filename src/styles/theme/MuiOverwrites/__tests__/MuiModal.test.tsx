import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render } from "@testing-library/react";
import { Modal } from "@mui/material";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";

/**
 * Renders a modal with a backdrop inside the app theme.
 * @param open Whether the modal is open.
 * @returns The element tree to render.
 */
const modal = (open: boolean): React.ReactElement => (
  <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
    <Modal open={open} keepMounted>
      <div>Inhalt</div>
    </Modal>
  </ThemeProvider>
);

/**
 * Reads the opacity transition the backdrop fade has set.
 * @returns The inline `transition` of the backdrop.
 */
const backdropTransition = (): string =>
  document.querySelector<HTMLElement>(".MuiBackdrop-root")!.style.transition;

describe("MuiModal backdrop", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("fades in over 200 ms and out over 150 ms, like the dialog", () => {
    const { rerender } = render(modal(true));

    expect(backdropTransition()).toMatch(/opacity 200ms/);

    rerender(modal(false));
    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(backdropTransition()).toMatch(/opacity 150ms/);
  });
});
