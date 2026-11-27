import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Modal, Paper } from "@mui/material";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { MuiModalOverwrites } from "@styles/theme/MuiOverwrites/MuiModal";
import { ModalTransition } from "../ModalTransition";

/**
 * Renders a modal whose paper runs through the modal transition.
 * @param open Whether the modal is open.
 * @param onExited Called once the exit has finished.
 * @param keepMounted Whether the closed modal stays in the DOM.
 * @returns The element tree to render.
 */
const modal = (
  open: boolean,
  onExited?: () => void,
  keepMounted = false,
  onClose?: () => void
): React.ReactElement => (
  <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
    <Modal
      open={open}
      closeAfterTransition
      keepMounted={keepMounted}
      onClose={onClose}
    >
      <ModalTransition in={open} onExited={onExited}>
        <Paper className="modal-container" data-testid="dialog">
          Inhalt
        </Paper>
      </ModalTransition>
    </Modal>
  </ThemeProvider>
);

describe("ModalTransition", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("marks the dialog while it enters and leaves", () => {
    const onExited = vi.fn();
    const { rerender } = render(modal(true, onExited));

    expect(screen.getByTestId("dialog")).toHaveAttribute(
      "data-motion",
      "enter"
    );

    rerender(modal(false, onExited));

    expect(screen.getByTestId("dialog")).toHaveAttribute("data-motion", "exit");

    act(() => {
      vi.advanceTimersByTime(149);
    });

    expect(screen.getByTestId("dialog")).toBeInTheDocument();
    expect(onExited).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(onExited).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId("dialog")).toBeNull();
  });

  it("enters again when a kept modal opens again", () => {
    const { rerender } = render(modal(true, undefined, true));

    rerender(modal(false, undefined, true));
    act(() => {
      vi.advanceTimersByTime(150);
    });

    expect(screen.getByTestId("dialog")).toHaveAttribute("data-motion", "exit");

    rerender(modal(true, undefined, true));

    expect(screen.getByTestId("dialog")).toHaveAttribute(
      "data-motion",
      "enter"
    );
  });

  it("lets the modal move focus into the dialog and close on Escape", () => {
    const onClose = vi.fn();
    render(modal(true, undefined, false, onClose));
    const dialog = screen.getByTestId("dialog");

    expect(dialog).toHaveAttribute("tabindex", "-1");
    expect(dialog).toHaveFocus();

    fireEvent.keyDown(dialog, { key: "Escape" });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("scales the dialog in and out, but not with reduced motion", () => {
    // Cast: the root override is a plain style callback; only its object is read here.
    const root = (
      MuiModalOverwrites.MuiModal?.styleOverrides?.root as () => Record<
        string,
        Record<string, Record<string, unknown>>
      >
    )();
    const container = root[".modal-container"];

    expect(String(container['&[data-motion="enter"]'].animation)).toMatch(
      /300ms var\(--mf-spring\)/
    );
    expect(String(container['&[data-motion="exit"]'].animation)).toMatch(
      /150ms var\(--mf-ease-out\) both$/
    );
    expect(
      container["@media (prefers-reduced-motion: reduce)"]["&[data-motion]"]
    ).toEqual({ animation: "none" });
  });
});
