import { PaletteColorOptions } from "@mui/material";
import { mfWhite } from "./colors/mfWhite";
import { mfBlack } from "./colors/mfBlack";

export const mfContrast: PaletteColorOptions = {
  ...mfWhite,
  light: mfWhite[300],
  main: mfWhite[500],
  dark: mfWhite[700],
  contrastText: "var(--mf-palette-common-black)",
};

export const mfContrastLight: PaletteColorOptions = {
  ...mfBlack,
  light: mfBlack[300],
  main: mfBlack[500],
  dark: mfBlack[700],
  contrastText: "var(--mf-palette-common-white)",
};

export const mfContrastDark: PaletteColorOptions = {
  ...mfContrast,
};
