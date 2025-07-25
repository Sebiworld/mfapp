import { mfWhite } from "./colors/mfWhite";
import { mfBlack } from "./colors/mfBlack";
import { ExtendedPaletteColor } from "../mfTheme";

export const mfContrast: ExtendedPaletteColor = {
  ...mfWhite,

  light: mfWhite[300],
  main: mfWhite[500],
  dark: mfWhite[700],
  contrastText: "var(--mf-palette-common-black)",
  contrastBorder: mfBlack[500],
};

export const mfContrastLight: ExtendedPaletteColor = {
  ...mfBlack,

  light: mfBlack[300],
  main: mfBlack[500],
  dark: mfBlack[700],
  contrastText: "var(--mf-palette-common-white)",
  contrastBorder: mfWhite[500],
};

export const mfContrastDark: ExtendedPaletteColor = {
  ...mfContrast,
};
