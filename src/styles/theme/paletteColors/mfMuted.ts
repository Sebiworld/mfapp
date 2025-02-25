import { mfDarkGray } from "./colors/mfDarkGray";
import { mfLightGray } from "./colors/mfLightGray";
import { ExtendedPaletteColor } from "../mfTheme";

export const mfMuted: ExtendedPaletteColor = {
  ...mfDarkGray,

  light: mfDarkGray[300],
  main: mfDarkGray[500],
  dark: mfDarkGray[700],
  contrastText: "var(--mf-palette-common-white)",
};

export const mfMutedLight: ExtendedPaletteColor = {
  ...mfLightGray,

  light: mfLightGray[300],
  main: mfLightGray[500],
  dark: mfLightGray[700],
  contrastText: "var(--mf-palette-common-black)",
};

export const mfMutedDark: ExtendedPaletteColor = {
  ...mfMuted,
};
