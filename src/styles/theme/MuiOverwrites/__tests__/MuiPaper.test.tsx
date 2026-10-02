import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card, Menu, Paper } from "@mui/material";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";

/**
 * Renders the given element inside the app theme.
 * @param element - element to render
 */
const renderThemed = (element: React.ReactElement): void => {
  render(
    <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
      {element}
    </ThemeProvider>
  );
};

describe("MuiPaper overwrites", () => {
  it("renders papers and cards in the page flow flat", () => {
    renderThemed(
      <>
        <Paper data-testid="paper" />
        <Card data-testid="card" />
      </>
    );

    expect(screen.getByTestId("paper")).toHaveClass("MuiPaper-elevation0");
    expect(screen.getByTestId("card")).toHaveClass("MuiPaper-elevation0");
  });

  it("keeps the elevation of floating layers, which set their own", () => {
    renderThemed(
      <Menu open anchorEl={document.body}>
        <li>Eintrag</li>
      </Menu>
    );

    expect(document.querySelector(".MuiMenu-paper")).toHaveClass(
      "MuiPaper-elevation8"
    );
  });
});
