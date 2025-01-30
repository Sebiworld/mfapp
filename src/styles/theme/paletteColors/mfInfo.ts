import { PaletteColorOptions } from "@mui/material";
import { mfBlue } from "./colors/mfBlue";

export const mfInfo: PaletteColorOptions = {
  ...mfBlue,
  light: mfBlue[300],
  main: mfBlue[500],
  dark: mfBlue[700],
  contrastText: "var(--mf-palette-common-white)",
};

export const mfInfoLight: PaletteColorOptions = {
  ...mfInfo,
};

export const mfInfoDark: PaletteColorOptions = {
  ...mfInfo,
};
