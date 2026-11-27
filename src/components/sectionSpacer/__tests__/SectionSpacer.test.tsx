import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { ReactElement } from "react";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { SectionSpacer } from "../SectionSpacer";

/**
 * Renders a spacer in the app theme.
 * @param props Props of the spacer.
 * @returns The element to render.
 */
const themed = (props: Parameters<typeof SectionSpacer>[0]): ReactElement => (
  <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
    <SectionSpacer {...props} />
  </ThemeProvider>
);

describe("SectionSpacer", () => {
  it("renders the stripes and both logo graphics", () => {
    const { container } = render(themed({}));
    const root = container.querySelector(".section-spacer") as Element;

    for (const name of [
      "spacer-up",
      "spacer-down",
      "logo-wide",
      "logo-mobile",
    ]) {
      expect(root.querySelector(`svg.${name}`)).not.toBeNull();
    }
  });

  it("maps position, logo and color to classes", () => {
    const { container } = render(
      themed({
        position: "bottom",
        logo: "auto",
        logoColor: "light",
        color: "dark",
      })
    );
    const root = container.querySelector(".section-spacer") as Element;

    for (const name of [
      "position-bottom",
      "logo-auto",
      "logocolor-light",
      "color-dark",
    ]) {
      expect(root.classList.contains(name)).toBe(true);
    }
  });

  it("carries no motion classes or moving stripe graphics", () => {
    const { container } = render(themed({ position: "top" }));
    const root = container.querySelector(".section-spacer") as Element;

    for (const name of ["is-armed", "is-playing", "is-paused"]) {
      expect(root.classList.contains(name)).toBe(false);
    }
    expect(root.querySelector(".motion-stripe")).toBeNull();
  });
});
