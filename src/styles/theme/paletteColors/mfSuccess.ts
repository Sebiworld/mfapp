import { mfGreen } from "./colors/mfGreen";
import { ExtendedPaletteColor } from "../mfTheme";

export const mfSuccess: ExtendedPaletteColor = {
  ...mfGreen,

  light: mfGreen[300],
  main: mfGreen[500],
  dark: mfGreen[700],
  contrastText: "var(--mf-palette-common-white)",
};

export const mfSuccessLight: ExtendedPaletteColor = {
  ...mfSuccess,
};

export const mfSuccessDark: ExtendedPaletteColor = {
  ...mfSuccess,
};
