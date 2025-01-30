import { PaletteColorOptions } from "@mui/material";
import { mfRed } from "./colors/mfRed";

export const mfDanger: PaletteColorOptions = {
  ...mfRed,
  light: mfRed[300],
  main: mfRed[500],
  dark: mfRed[700],
  contrastText: "var(--mf-palette-common-white)",
};

export const mfDangerLight: PaletteColorOptions = {
  ...mfDanger,
};

export const mfDangerDark: PaletteColorOptions = {
  ...mfDanger,
};
