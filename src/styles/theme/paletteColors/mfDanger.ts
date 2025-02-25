import { mfRed } from "./colors/mfRed";
import { ExtendedPaletteColor } from "../mfTheme";

export const mfDanger: ExtendedPaletteColor = {
  ...mfRed,

  light: mfRed[300],
  main: mfRed[500],
  dark: mfRed[700],
  contrastText: "var(--mf-palette-common-white)",
};

export const mfDangerLight: ExtendedPaletteColor = {
  ...mfDanger,
};

export const mfDangerDark: ExtendedPaletteColor = {
  ...mfDanger,
};
