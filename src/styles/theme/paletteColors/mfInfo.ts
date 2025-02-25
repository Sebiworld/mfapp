import { mfBlue } from "./colors/mfBlue";
import { ExtendedPaletteColor } from "../mfTheme";

export const mfInfo: ExtendedPaletteColor = {
  ...mfBlue,

  light: mfBlue[300],
  main: mfBlue[500],
  dark: mfBlue[700],
  contrastText: "var(--mf-palette-common-white)",
};

export const mfInfoLight: ExtendedPaletteColor = {
  ...mfInfo,
};

export const mfInfoDark: ExtendedPaletteColor = {
  ...mfInfo,
};
