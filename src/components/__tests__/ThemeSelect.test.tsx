import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import ThemeSelect from "../ThemeSelect";

const renderSelect = () =>
  render(
    <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
      <ThemeSelect />
    </ThemeProvider>
  );

describe("ThemeSelect", () => {
  it("shows the current light mode and offers dark mode on hover", () => {
    renderSelect();

    const button = screen.getByRole("button");
    const icons = button.querySelectorAll("svg");

    expect(icons[0]).toHaveAttribute("data-testid", "LightModeIcon");
    expect(button.querySelector(".hover-container")).toContainElement(
      screen.getByTestId("DarkModeIcon")
    );
  });

  it("switches to dark mode on click", () => {
    renderSelect();

    fireEvent.click(screen.getByRole("button"));

    const icons = screen.getByRole("button").querySelectorAll("svg");
    expect(icons[0]).toHaveAttribute("data-testid", "DarkModeIcon");
  });
});
