import { extendTheme, PaletteRange } from "@mui/joy/styles";
import { JoyLinkOverwrites } from "./MuiOverwrites/JoyLink";
import { JoyAlertOverwrites } from "./MuiOverwrites/JoyAlert";
import { JoyButtonOverwrites } from "./MuiOverwrites/JoyButton";
import {
  mfDanger,
  mfDark,
  mfInfoDark,
  mfInfoLight,
  mfLight,
  mfNeutralDark,
  mfNeutralLight,
  mfPrimaryDark,
  mfPrimaryLight,
  mfProjectPrimaryDark,
  mfProjectPrimaryLight,
  mfSuccess,
  mfWarning,
} from "./colors";
import { JoyModalOverwrites } from "./MuiOverwrites/JoyModal";

declare module "@mui/joy/styles" {
  interface ColorPalettePropOverrides {
    info: true;
    light: true;
    dark: true;
    contrast: true;
    projectPrimary: true;
  }

  interface Palette {
    info: PaletteRange;
    light: PaletteRange;
    dark: PaletteRange;
    contrast: PaletteRange;
    projectPrimary: PaletteRange;
  }
}

export const mfTheme = extendTheme({
  cssVarPrefix: "mf",

  fontFamily: {
    display:
      "Aileron, -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans- serif",
    body: "Aileron, -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans- serif",
    fallback: "Cardo, Georgia, Times New Roman, Times, serif",
    code: "Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
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
        primary: mfPrimaryLight,
        danger: mfDanger,
        success: mfSuccess,
        warning: mfWarning,
        neutral: mfNeutralLight,
        info: mfInfoLight,
        dark: mfDark,
        light: mfLight,
        contrast: mfDark,
        projectPrimary: mfProjectPrimaryLight,
      },
    },
    dark: {
      palette: {
        primary: mfPrimaryDark,
        danger: mfDanger,
        success: mfSuccess,
        warning: mfWarning,
        neutral: mfNeutralDark,
        info: mfInfoDark,
        dark: mfDark,
        light: mfLight,
        contrast: mfLight,
        projectPrimary: mfProjectPrimaryDark,
      },
    },
  },
  components: {
    ...JoyLinkOverwrites,
    ...JoyAlertOverwrites,
    ...JoyButtonOverwrites,
    ...JoyModalOverwrites,
  },
});
