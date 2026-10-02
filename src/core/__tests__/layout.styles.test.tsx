import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Box } from "@mui/material";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { layoutStyles } from "../layout.styles";

/**
 * Renders the layout with a page whose last chapter has the given surface.
 * @param surface - surface of the last chapter
 * @returns the main content element
 */
const renderWithLastChapter = (surface: string): HTMLElement => {
  const { container } = render(
    <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
      <Box sx={layoutStyles}>
        <Box className="main-content">
          <Box className="page">
            <Box className="page-contents">
              <Box className="sections-container">
                <Box className="chapter surface-paper" />
                <Box className={`chapter surface-${surface}`} />
              </Box>
            </Box>
            <Box className="breadcrumbs" />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );

  return container.querySelector(".main-content") as HTMLElement;
};

describe("layout styles", () => {
  it("continues a light slate last chapter below it, so breadcrumbs and footer band do not sit on white", () => {
    const mainContent = renderWithLastChapter("secondary-light");

    expect(getComputedStyle(mainContent).backgroundColor).toBe(
      "var(--surface-secondary-light)"
    );
  });

  it("keeps the page background when the page ends with a default chapter", () => {
    const mainContent = renderWithLastChapter("default");

    expect(getComputedStyle(mainContent).backgroundColor).not.toContain(
      "--surface-"
    );
  });
});
