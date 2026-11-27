import { CSSProperties } from "react";
import { SxProps, Theme } from "@mui/material";

/** The lottie view fills the press layer of the heart button. */
export const heartAnimationStyles: CSSProperties = {
  display: "block",
  width: "100%",
  height: "100%",
};

// The button takes the size and margins the heart always had, so loading the animation shifts nothing.
export const heartButtonStyles: SxProps<Theme> = {
  position: "relative",
  display: "block",
  margin: "0 -16px 0 -16px",
  width: "3.5em",
  height: "3em",
  overflow: "visible",

  // Pointer-only easter egg: no tap flash, no text selection, no double-tap zoom delay.
  cursor: "pointer",
  touchAction: "manipulation",
  userSelect: "none",
  WebkitUserSelect: "none",
  WebkitTapHighlightColor: "transparent",

  // Squeezes quickly on press and springs back on release.
  ".heart-press": {
    display: "block",
    width: "100%",
    height: "100%",
    transition: "transform 580ms var(--mf-spring)",
  },

  "&.is-pressed .heart-press": {
    transform: "scale(0.85)",
    transition: "transform 100ms var(--mf-ease-out)",
  },

  ".heart-particle": {
    position: "absolute",
    pointerEvents: "none",
    willChange: "transform, opacity",

    svg: {
      display: "block",
      width: "100%",
      height: "100%",
    },
  },

  "@media (prefers-reduced-motion: reduce)": {
    ".heart-press, &.is-pressed .heart-press": {
      transform: "none",
      transition: "none",
    },
  },
};
