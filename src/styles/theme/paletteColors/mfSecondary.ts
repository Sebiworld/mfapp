import { PaletteColorOptions } from "@mui/material";
import { mfLimedSpruceBlue } from "./colors/mfLimedSpruceBlue";

export const mfSecondary: PaletteColorOptions = {
  ...mfLimedSpruceBlue,
  light: mfLimedSpruceBlue[300],
  main: mfLimedSpruceBlue[500],
  dark: mfLimedSpruceBlue[700],
  contrastText: "var(--mf-palette-common-white)",
};

export const mfSecondaryLight: PaletteColorOptions = {
  ...mfSecondary,
};

export const mfSecondaryDark: PaletteColorOptions = {
  ...mfSecondary,
};
