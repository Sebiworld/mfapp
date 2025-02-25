import { mfWhite } from "./colors/mfWhite";
import { ExtendedPaletteColor } from "../mfTheme";

export const mfLight: ExtendedPaletteColor = {
  ...mfWhite,

  light: mfWhite[300],
  main: mfWhite[500],
  dark: mfWhite[700],
  contrastText: "var(--mf-palette-common-black)",
};

export const mfLightLight: ExtendedPaletteColor = {
  ...mfLight,
};

export const mfLightDark: ExtendedPaletteColor = {
  ...mfLight,
};
