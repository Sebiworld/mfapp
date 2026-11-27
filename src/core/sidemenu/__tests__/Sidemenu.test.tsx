import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import "@utils/i18n/i18n";
import { Sidemenu } from "../Sidemenu";

describe("Sidemenu", () => {
  beforeEach(() => {
    vi.stubGlobal("__VERSION__", "0.0.0");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("names the close button for assistive technology", () => {
    const setSidemenuOpen = vi.fn();
    render(
      <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
        <MemoryRouter>
          <Sidemenu sidemenuOpen setSidemenuOpen={setSidemenuOpen} />
        </MemoryRouter>
      </ThemeProvider>
    );

    const close = screen.getByRole("button", { name: "Menü schließen" });
    fireEvent.click(close);

    expect(setSidemenuOpen).toHaveBeenCalledWith(false);
  });
});
