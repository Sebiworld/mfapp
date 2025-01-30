import { createTheme } from "@mui/material";
import type {} from "@mui/x-date-pickers/themeAugmentation";
import type {} from "@mui/material/themeCssVarsAugmentation";
import { MuiAlertOverwrites } from "./MuiOverwrites/MuiAlert";
import { MuiButtonOverwrites } from "./MuiOverwrites/MuiButton";
import { MuiChipOverwrites } from "./MuiOverwrites/MuiChip";
import { MuiFormControlOverwrites } from "./MuiOverwrites/MuiFormControl";
import { MuiLinkOverwrites } from "./MuiOverwrites/MuiLink";
import { MuiModalOverwrites } from "./MuiOverwrites/MuiModal";
import { MuiPickersInputOverwrites } from "./MuiOverwrites/MuiPickersInput";
import { mfPrimaryDark, mfPrimaryLight } from "./paletteColors/mfPrimary";
import { mfSecondaryDark, mfSecondaryLight } from "./paletteColors/mfSecondary";
import { mfDangerDark, mfDangerLight } from "./paletteColors/mfDanger";
import { mfContrastDark, mfContrastLight } from "./paletteColors/mfContrast";
import { mfMutedDark, mfMutedLight } from "./paletteColors/mfMuted";
import { mfSuccessDark, mfSuccessLight } from "./paletteColors/mfSuccess";
import { mfWarningDark, mfWarningLight } from "./paletteColors/mfWarning";
import { mfLightDark, mfLightLight } from "./paletteColors/mfLight";
import { mfInfoDark, mfInfoLight } from "./paletteColors/mfInfo";
import { mfDarkDark, mfDarkLight } from "./paletteColors/mfDark";
import { MuiToolbarOverwrites } from "./MuiOverwrites/MuiToolbar";

declare module "@mui/material/styles" {
  interface Palette {
    muted: Palette["primary"];
    light: Palette["primary"];
    dark: Palette["primary"];
    contrast: Palette["primary"];
    projectPrimary: Palette["primary"];
  }

  interface PaletteOptions {
    muted?: PaletteOptions["primary"];
    light?: PaletteOptions["primary"];
    dark?: PaletteOptions["primary"];
    contrast?: PaletteOptions["primary"];
    projectPrimary?: PaletteOptions["primary"];
    rawBackground?: string;
  }

  interface Color {
    lightChannel?: string;
    mainChannel?: string;
    darkChannel?: string;
  }

  interface TypographyVariants {
    code: React.CSSProperties;
    serif: React.CSSProperties;
    bodyXS: React.CSSProperties;
  }

  // allow configuration using `createTheme()`
  interface TypographyVariantsOptions {
    code?: React.CSSProperties;
    serif?: React.CSSProperties;
    bodyXS?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    code: true;
    serif: true;
    bodyXS: true;
  }
}

export const mainFontFamiliy = [
  "Aileron",
  "-apple-system",
  "BlinkMacSystemFont",
  '"Segoe UI"',
  "Roboto",
  '"Helvetica Neue"',
  "Arial",
  "sans-serif",
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
].join(",");
export const serifFontFamily = [
  "Cardo",
  "Georgia",
  "'Times New Roman'",
  "Times",
  "serif",
].join(",");
export const codeFontFamily = [
  "Menlo",
  "Monaco",
  "Consolas",
  "'Liberation Mono'",
  "'Courier New'",
  "monospace",
].join(",");

export const mfTheme = createTheme({
  cssVariables: {
    cssVarPrefix: "mf",
    colorSchemeSelector: ".theme-%s",
  },

  typography: {
    fontFamily: mainFontFamiliy,

    h1: {
      fontSize: "4rem",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "3.4rem",
      fontWeight: "bold",
    },
    h3: {
      fontWeight: "bold",
    },
    h4: {
      fontWeight: "bold",
    },
    h5: {
      fontWeight: "bold",
    },
    h6: {
      fontWeight: "bold",
    },

    bodyXS: {
      fontSize: "1rem",
    },

    serif: {
      fontFamily: serifFontFamily,
    },

    code: {
      fontFamily: codeFontFamily,
    },
  },

  shape: {
    borderRadius: 1
  },

  colorSchemes: {
    light: {
      palette: {
        primary: mfPrimaryLight,
        secondary: mfSecondaryLight,
        error: mfDangerLight,
        warning: mfWarningLight,
        success: mfSuccessLight,
        info: mfInfoLight,
        muted: mfMutedLight,
        light: mfLightLight,
        dark: mfDarkLight,
        contrast: mfContrastLight,
        projectPrimary: mfPrimaryLight,
      },
    },
    dark: {
      palette: {
        primary: mfPrimaryDark,
        secondary: mfSecondaryDark,
        error: mfDangerDark,
        warning: mfWarningDark,
        success: mfSuccessDark,
        info: mfInfoDark,
        muted: mfMutedDark,
        light: mfLightDark,
        dark: mfDarkDark,
        contrast: mfContrastDark,
        projectPrimary: mfPrimaryDark,
        background: {
          default: "#000000",
        },
      },
    },
  },

  components: {
    ...MuiAlertOverwrites,
    ...MuiButtonOverwrites,
    ...MuiChipOverwrites,
    ...MuiFormControlOverwrites,
    ...MuiLinkOverwrites,
    ...MuiModalOverwrites,
    ...MuiPickersInputOverwrites,
    ...MuiToolbarOverwrites,
  },
});
