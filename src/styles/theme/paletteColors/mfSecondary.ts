import { mfLimedSpruceBlue } from "./colors/mfLimedSpruceBlue";
import { ExtendedPaletteColor } from "../mfTheme";

export const mfSecondary: ExtendedPaletteColor = {
  ...mfLimedSpruceBlue,

  light: mfLimedSpruceBlue[300],
  main: mfLimedSpruceBlue[500],
  dark: mfLimedSpruceBlue[700],
  contrastText: "var(--mf-palette-common-white)",
};

export const mfSecondaryLight: ExtendedPaletteColor = {
  ...mfSecondary,
};

export const mfSecondaryDark: ExtendedPaletteColor = {
  ...mfSecondary,
};
