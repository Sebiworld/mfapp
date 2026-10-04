import { mfOrange } from "./colors/mfOrange";
import { ExtendedPaletteColor } from "../mfTheme";

export const mfPrimary: ExtendedPaletteColor = {
  ...mfOrange,

  light: mfOrange[300],
  main: mfOrange[500],
  dark: mfOrange[700],
  // White on Fabrik Orange is about 2.3:1; black reaches about 9:1.
  contrastText: "var(--mf-palette-common-black)",
};

export const mfPrimaryLight: ExtendedPaletteColor = {
  ...mfPrimary,
};

export const mfPrimaryDark: ExtendedPaletteColor = {
  ...mfPrimary,
};
