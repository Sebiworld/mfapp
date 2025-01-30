import { PaletteColorOptions } from "@mui/material";
import { mfGreen } from "./colors/mfGreen";

export const mfSuccess: PaletteColorOptions = {
  ...mfGreen,
  light: mfGreen[300],
  main: mfGreen[500],
  dark: mfGreen[700],
  contrastText: "var(--mf-palette-common-white)",
};

export const mfSuccessLight: PaletteColorOptions = {
  ...mfSuccess,
};

export const mfSuccessDark: PaletteColorOptions = {
  ...mfSuccess,
};
