import { PaletteColorOptions } from "@mui/material";
import { mfOrange } from "./colors/mfOrange";

export const mfPrimary: PaletteColorOptions = {
  ...mfOrange,
  light: mfOrange[300],
  main: mfOrange[500],
  dark: mfOrange[700],
  contrastText: "var(--mf-palette-common-white)",
};

export const mfPrimaryLight: PaletteColorOptions = {
  ...mfPrimary,
};

export const mfPrimaryDark: PaletteColorOptions = {
  ...mfPrimary,
};
