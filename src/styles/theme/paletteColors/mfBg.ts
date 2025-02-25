import { mfWhite } from "./colors/mfWhite";
import { mfBlack } from "./colors/mfBlack";
import { ExtendedPaletteColor } from "../mfTheme";

export const mfBg: ExtendedPaletteColor = {
  ...mfBlack,

  light: mfBlack[300],
  main: mfBlack[500],
  dark: mfBlack[700],
  contrastText: "var(--mf-palette-common-white)",
};

export const mfBgLight: ExtendedPaletteColor = {
  ...mfWhite,

  light: mfWhite[300],
  main: mfWhite[500],
  dark: mfWhite[700],
  contrastText: "var(--mf-palette-common-black)",
};

export const mfBgDark: ExtendedPaletteColor = {
  ...mfBg,
};
