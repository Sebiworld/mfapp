import { Interpolation } from "@emotion/react";
import { Theme } from "@mui/material";

// Absolute so the fonts load on every path depth.
const FONT_PATH = "/assets/fonts/aileron/";

interface AileronFace {
  /** File name without extension, e.g. `Aileron-Bold`. */
  file: string;
  weight: number;
  style: "normal" | "italic";
}

const AILERON_FACES: AileronFace[] = [
  { file: "Aileron-Bold", weight: 700, style: "normal" },
  { file: "Aileron-Heavy", weight: 800, style: "normal" },
  { file: "Aileron-HeavyItalic", weight: 800, style: "italic" },
  { file: "Aileron-Light", weight: 400, style: "normal" },
  { file: "Aileron-LightItalic", weight: 400, style: "italic" },
];

/**
 * Builds the `@font-face` rule of one Aileron face. The browser takes the first format it supports, so woff2
 * comes first; woff is only a fallback for browsers without woff2.
 * @param face File name, weight and style of the face.
 * @returns Global style object with the `@font-face` rule.
 */
const getAileronFontFace = (face: AileronFace): Interpolation<Theme> => ({
  "@font-face": {
    fontFamily: "Aileron",
    src: `local("Aileron"),
      url("${FONT_PATH}${face.file}.woff2") format("woff2"),
      url("${FONT_PATH}${face.file}.woff") format("woff")`,
    fontWeight: face.weight,
    fontStyle: face.style,
    fontDisplay: "swap",
  },
});

export const globalFontsStyles: Interpolation<Theme>[] =
  AILERON_FACES.map(getAileronFontFace);
