import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { Box } from "@mui/material";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { pagesMosaicStyles } from "../pagesMosaic.styles";

describe("pagesMosaic styles", () => {
  // Own file: emotion reports a selector only when it first compiles the styles, which happens once per file.
  it("raise no warning about selectors that are unsafe for server rendering", () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => {});

    try {
      render(
        <ThemeProvider
          theme={{ [THEME_ID]: mfTheme }}
          noSsr
          defaultMode="light"
        >
          <Box sx={pagesMosaicStyles}>
            <a className="mosaic-tile" href="/a">
              <span className="tile-title">A</span>
            </a>
          </Box>
        </ThemeProvider>
      );

      const messages = errors.mock.calls.map((call) => String(call[0]));

      expect(messages.filter((message) => message.includes("-child"))).toEqual(
        []
      );
    } finally {
      errors.mockRestore();
    }
  });
});
