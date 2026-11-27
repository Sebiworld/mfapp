import { afterEach, describe, expect, it } from "vitest";
import { act, fireEvent, render, renderHook } from "@testing-library/react";
import { Slide, toast, ToastContainer } from "react-toastify";
import { resetMatchMedia, setReducedMotion } from "@src/test/motion";
import { toastifyStyles } from "@styles/global/vendors/toastify.styles";
import { TOAST_FADE, useToastTransition } from "../toastTransition";

/**
 * Waits longer than two animation frames, but shorter than react-toastify's 300 ms height collapse.
 */
const waitFrames = async (): Promise<void> => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 80));
  });
};

describe("useToastTransition", () => {
  afterEach(() => {
    resetMatchMedia();
    toast.dismiss();
  });

  it("slides toasts in normally and only fades them with reduced motion", () => {
    setReducedMotion(false);
    const normal = renderHook(() => useToastTransition());

    expect(normal.result.current).toBe(Slide);
    normal.unmount();

    setReducedMotion(true);
    const reduced = renderHook(() => useToastTransition());

    expect(reduced.result.current).toBe(TOAST_FADE);
    expect(TOAST_FADE).not.toBe(Slide);
  });

  it("removes a faded toast without letting its height collapse", async () => {
    const { container } = render(<ToastContainer transition={TOAST_FADE} />);

    act(() => {
      toast("Gespeichert", { autoClose: false });
    });
    await waitFrames();

    const element = container.querySelector<HTMLElement>(".Toastify__toast");

    expect(element).not.toBeNull();
    fireEvent.animationEnd(element!);

    act(() => {
      toast.dismiss();
    });
    await waitFrames();

    expect(element).toHaveClass("mf-toast-fade-out");
    fireEvent.animationEnd(element!);
    await waitFrames();

    expect(element!.style.height).toBe("");
    expect(container.querySelector(".Toastify__toast")).toBeNull();
  });

  it("keeps the toast icon still with reduced motion", () => {
    // Cast: the style list is only read here as plain objects.
    const styles = (
      toastifyStyles as unknown as Record<
        string,
        Record<string, Record<string, unknown>>
      >[]
    )[0];

    expect(
      styles["@media (prefers-reduced-motion: reduce)"][
        ".Toastify__toast-icon.Toastify--animate-icon"
      ]
    ).toEqual({ animation: "none" });
  });
});
