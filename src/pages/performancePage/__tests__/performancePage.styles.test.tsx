import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { Box } from "@mui/material";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import {
  directionsPaperStyles,
  performancePageStyles,
} from "../performancePage.styles";

describe("performancePage styles", () => {
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
          <Box sx={performancePageStyles}>
            <Box className="performance-visit">
              <Box className="visit-text">
                <p>Einlass</p>
                <h3>Garderobe</h3>
              </Box>
            </Box>
          </Box>
          <Box sx={directionsPaperStyles}>
            <Box className="directions-text">
              <h3>Parken</h3>
            </Box>
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
