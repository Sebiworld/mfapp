import { mfOrange } from "./colors/mfOrange";
import { ExtendedPaletteColor } from "../mfTheme";

export const mfPrimary: ExtendedPaletteColor = {
  ...mfOrange,

  light: mfOrange[300],
  main: mfOrange[500],
  dark: mfOrange[700],
  contrastText: "var(--mf-palette-common-white)",
};

export const mfPrimaryLight: ExtendedPaletteColor = {
  ...mfPrimary,
};

export const mfPrimaryDark: ExtendedPaletteColor = {
  ...mfPrimary,
};
