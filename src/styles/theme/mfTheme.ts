import { extendTheme, PaletteRange } from "@mui/joy/styles";
import { JoyLinkOverwrites } from "./MuiOverwrites/JoyLink";
import { JoyAlertOverwrites } from "./MuiOverwrites/JoyAlert";
import { JoyButtonOverwrites } from "./MuiOverwrites/JoyButton";
import {
  mfDanger,
  mfDark,
  mfLight,
  mfNeutralDark,
  mfNeutralLight,
  mfOrange,
  mfSuccess,
  mfWarning,
} from "./colors";

declare module "@mui/joy/styles" {
  interface ColorPalettePropOverrides {
    light: true;
    dark: true;
    contrast: true;
  }

  interface Palette {
    light: PaletteRange;
    dark: PaletteRange;
    contrast: PaletteRange;
  }
}

export const mfTheme = extendTheme({
  cssVarPrefix: "mf",

  fontFamily: {
    display:
      "Aileron, -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans- serif",
    body: "Aileron, -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans- serif",
  },

  typography: {
    h1: {
      fontSize: "4rem",
    },
    h2: {
      fontSize: "3.4rem",
    },
  },

  colorSchemes: {
    light: {
      palette: {
        primary: mfOrange,
        danger: mfDanger,
        success: mfSuccess,
        warning: mfWarning,
        neutral: mfNeutralLight,
        dark: mfDark,
        light: mfLight,
        contrast: mfDark,
      },
    },
    dark: {
      palette: {
        primary: mfOrange,
        danger: mfDanger,
        success: mfSuccess,
        warning: mfWarning,
        neutral: mfNeutralDark,
        dark: mfDark,
        light: mfLight,
        contrast: mfLight,
      },
    },
  },
  components: {
    ...JoyLinkOverwrites,
    ...JoyAlertOverwrites,
    ...JoyButtonOverwrites,
  },
});
