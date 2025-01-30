import { PaletteColorOptions } from "@mui/material";
import { mfDarkGray } from "./colors/mfDarkGray";
import { mfLightGray } from "./colors/mfLightGray";

export const mfMuted: PaletteColorOptions = {
  ...mfDarkGray,
  light: mfDarkGray[300],
  main: mfDarkGray[500],
  dark: mfDarkGray[700],
  contrastText: "var(--mf-palette-common-white)",
};

export const mfMutedLight: PaletteColorOptions = {
  ...mfLightGray,
  light: mfLightGray[300],
  main: mfLightGray[500],
  dark: mfLightGray[700],
  contrastText: "var(--mf-palette-common-black)",
};

export const mfMutedDark: PaletteColorOptions = {
  ...mfMuted,
};
