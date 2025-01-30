import { PaletteColorOptions } from "@mui/material";
import { mfTeal } from "./colors/mfTeal";

export const mfSecondary: PaletteColorOptions = {
  ...mfTeal,
  light: mfTeal[300],
  main: mfTeal[500],
  dark: mfTeal[700],
  contrastText: "var(--mf-palette-common-black)",
};

export const mfSecondaryLight: PaletteColorOptions = {
  ...mfSecondary,
};

export const mfSecondaryDark: PaletteColorOptions = {
  ...mfSecondary,
};
