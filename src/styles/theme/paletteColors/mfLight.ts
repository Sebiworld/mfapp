import { PaletteColorOptions } from "@mui/material";
import { mfWhite } from "./colors/mfWhite";

export const mfLight: PaletteColorOptions = {
  ...mfWhite,
  light: mfWhite[300],
  main: mfWhite[500],
  dark: mfWhite[700],
  contrastText: "var(--mf-palette-common-black)",
};

export const mfLightLight: PaletteColorOptions = {
  ...mfLight,
};

export const mfLightDark: PaletteColorOptions = {
  ...mfLight,
};
