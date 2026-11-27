import { keyframes } from "@emotion/react";
import { SxProps, Theme } from "@mui/material";

const sweep = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  14% {
    opacity: 1;
  }
  76% {
    opacity: 1;
  }
  100% {
    transform: translateX(195%);
    opacity: 0;
  }
`;

const settle = keyframes`
  from {
    transform: scale(1.03);
  }
  to {
    transform: scale(1);
  }
`;

/**
 * Styles of the header link: a stage light in the project colour sweeps once across the image while the image
 * settles from 1.03 to 1. The image stays fully visible throughout; only `transform` and `opacity` move.
 * @param theme App theme; the light uses the project colour.
 * @returns Style object for the link.
 */
export const projectHeaderImageStyles: SxProps<Theme> = (theme) => {
  const projectColor = theme.vars.palette.projectPrimary.main;

  return {
    // Keeps the screen blend of the light inside the header.
    isolation: "isolate",

    ".header-motion": {
      position: "absolute",
      inset: 0,
      overflow: "hidden",
      pointerEvents: "none",
    },

    ".header-light": {
      mixBlendMode: "screen",

      "&::before": {
        content: '""',
        position: "absolute",
        top: "-30%",
        bottom: "-30%",
        left: 0,
        width: "46%",
        opacity: 0,
        background: `radial-gradient(closest-side, rgba(255, 248, 236, 0.42), color-mix(in srgb, ${projectColor} 48%, transparent) 38%, color-mix(in srgb, ${projectColor} 14%, transparent) 70%, transparent 100%)`,
      },
    },

    "&.with-light.is-armed img": {
      transform: "scale(1.03)",
    },

    "&.with-light.is-playing img": {
      animation: `${settle} 900ms var(--mf-ease-out) both`,
    },

    "&.is-playing .header-light::before": {
      animation: `${sweep} 1.6s cubic-bezier(0.45, 0.05, 0.3, 1) both`,
    },

    "&.is-paused img, &.is-paused .header-light::before": {
      animationPlayState: "paused",
    },

    "@media (prefers-reduced-motion: reduce)": {
      ".header-motion": {
        display: "none",
      },

      "&.with-light img": {
        transform: "none",
        animation: "none",
      },
    },
  };
};
