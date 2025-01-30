import { PaletteColorOptions } from "@mui/material";
import { mfYellow } from "./colors/mfYellow";

export const mfWarning: PaletteColorOptions = {
  ...mfYellow,
  light: mfYellow[300],
  main: mfYellow[500],
  dark: mfYellow[700],
  contrastText: "var(--mf-palette-common-white)",
};

export const mfWarningLight: PaletteColorOptions = {
  ...mfWarning,
};

export const mfWarningDark: PaletteColorOptions = {
  ...mfWarning,
};
