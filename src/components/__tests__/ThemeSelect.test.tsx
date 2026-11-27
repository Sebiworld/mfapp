import { afterEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { i18n } from "@utils/i18n/i18n";
import {
  removeViewTransitionStub,
  resetMatchMedia,
  setReducedMotion,
  stubViewTransition,
} from "@src/test/motion";
import ThemeSelect from "../ThemeSelect";

const html = document.documentElement;

const renderSelect = () =>
  render(
    <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
      <ThemeSelect />
    </ThemeProvider>
  );

/** Lets the stubbed view transition run its update callback and `ready` handlers. */
const settle = (): Promise<void> =>
  act(() => new Promise<void>((resolve) => setTimeout(resolve, 0)));

describe("ThemeSelect", () => {
  afterEach(() => {
    removeViewTransitionStub();
    resetMatchMedia();
    html.className = "";
  });

  it("shows one icon and does not change its width on hover", () => {
    renderSelect();

    const button = screen.getByRole("button");
    expect(button.querySelectorAll("svg")).toHaveLength(1);

    fireEvent.mouseOver(button);

    expect(button.querySelectorAll("svg")).toHaveLength(1);
    expect(button.querySelector(".hover-container")).toBeNull();
  });

  it("names the target scheme", () => {
    renderSelect();

    const button = screen.getByRole("button", {
      name: i18n.t("theme_select.to_dark"),
    });
    expect(button).toHaveAttribute("title", i18n.t("theme_select.to_dark"));

    fireEvent.click(button);

    expect(button).toHaveAccessibleName(i18n.t("theme_select.to_light"));
    expect(button).toHaveAttribute("title", i18n.t("theme_select.to_light"));
  });

  it("switches inside the view transition, so the new colours are captured", async () => {
    const transition = stubViewTransition();
    renderSelect();

    fireEvent.click(screen.getByRole("button"));

    expect(transition.start).toHaveBeenCalledTimes(1);
    expect(html).toHaveClass("theme-light");
    await settle();
    expect(transition.htmlClassesAfterUpdate).toHaveLength(1);
    expect(transition.htmlClassesAfterUpdate[0]).toContain("theme-dark");
    expect(transition.htmlClassesAfterUpdate[0]).not.toContain("theme-light");
  });

  it("grows the circle from the middle of the button", async () => {
    const transition = stubViewTransition();
    renderSelect();
    const button = screen.getByRole("button");
    vi.spyOn(button, "getBoundingClientRect").mockReturnValue(
      new DOMRect(100, 20, 40, 40)
    );

    fireEvent.click(button);
    await settle();

    const [keyframes] = transition.animate.mock.calls[0];
    expect(html).toHaveClass("vt-circle");
    expect(keyframes).toMatchObject({
      clipPath: [
        "circle(0px at 120px 40px)",
        expect.stringMatching(/ at 120px 40px\)$/),
      ],
    });
  });

  it("only fades with reduced motion", async () => {
    setReducedMotion(true);
    const transition = stubViewTransition();
    renderSelect();

    fireEvent.click(screen.getByRole("button"));
    await settle();

    expect(html).toHaveClass("vt-fade");
    expect(transition.animate).not.toHaveBeenCalled();
  });

  it("switches at once without the API", () => {
    renderSelect();

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("button").querySelector("svg")).toHaveClass(
      "is-dark"
    );
    expect(html).toHaveClass("theme-dark");
  });
});
