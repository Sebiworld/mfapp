import { mfYellow } from "./colors/mfYellow";
import { ExtendedPaletteColor } from "../mfTheme";

export const mfWarning: ExtendedPaletteColor = {
  ...mfYellow,

  light: mfYellow[300],
  main: mfYellow[500],
  dark: mfYellow[700],
  contrastText: "var(--mf-palette-common-white)",
};

export const mfWarningLight: ExtendedPaletteColor = {
  ...mfWarning,
};

export const mfWarningDark: ExtendedPaletteColor = {
  ...mfWarning,
};
