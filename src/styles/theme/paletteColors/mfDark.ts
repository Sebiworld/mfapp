import { mfBlack } from "./colors/mfBlack";
import { ExtendedPaletteColor } from "../mfTheme";

export const mfDark: ExtendedPaletteColor = {
  ...mfBlack,

  light: mfBlack[300],
  main: mfBlack[500],
  dark: mfBlack[700],
  contrastText: "var(--mf-palette-common-white)",
};

export const mfDarkLight: ExtendedPaletteColor = {
  ...mfDark,
};

export const mfDarkDark: ExtendedPaletteColor = {
  ...mfDark,
};
