import { PaletteColorOptions } from "@mui/material";
import { mfBlack } from "./colors/mfBlack";

export const mfDark: PaletteColorOptions = {
  ...mfBlack,
  light: mfBlack[300],
  main: mfBlack[500],
  dark: mfBlack[700],
  contrastText: "var(--mf-palette-common-white)",
};

export const mfDarkLight: PaletteColorOptions = {
  ...mfDark,
};

export const mfDarkDark: PaletteColorOptions = {
  ...mfDark,
};
