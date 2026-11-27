import { keyframes } from "@emotion/react";
import { SxProps, Theme } from "@mui/material";

const REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

// Lengths on SVG parts are user units of the logo's viewBox, so the rise scales with the logo.
const rise = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }

  to {
    opacity: 1;
    transform: none;
  }
`;

const wipeX = keyframes`
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
`;

const messageIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(4px);
  }

  to {
    opacity: 1;
    transform: none;
  }
`;

const shimmer = keyframes`
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(230%);
  }
`;

/**
 * Builds an entrance delay that takes the time an earlier splash already played into account.
 * @param ms Delay from the start of the entrance.
 * @returns CSS time expression.
 */
const entranceDelay = (ms: number): string =>
  `calc(${ms}ms - var(--mf-splash-elapsed, 0ms))`;

export const splashScreenStyles: SxProps<Theme> = (theme) => ({
  // Layer
  position: "fixed",
  inset: 0,
  zIndex: 10000,
  backgroundColor: theme.vars.palette.background.default,
  color: theme.vars.palette.text.primary,
  "--splash-shimmer-color": "rgba(255, 255, 255, 0.6)",
  ...theme.applyStyles("dark", {
    "--splash-shimmer-color": "rgba(253, 142, 0, 0.85)",
  }),

  ".splash-content": {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "32px",
    padding: "32px",
  },

  ".logo-container": {
    display: "flex",
    flexDirection: "column",
    flex: "0 0 auto",
    width: "200px",
    maxWidth: "100%",
    height: "50vh",
    justifyContent: "flex-end",
  },

  ".logo-wrap": {
    position: "relative",
    width: "100%",
    aspectRatio: "1",

    ".mf-logo": {
      position: "absolute",
      inset: 0,
    },

    svg: {
      display: "block",
    },
  },

  // Logo entrance
  ".logo-m, .logo-f, .logo-bar": {
    transformBox: "fill-box",
  },

  ".logo-m": {
    animation: `${rise} 320ms var(--mf-ease-out) calc(var(--i) * 35ms - var(--mf-splash-elapsed, 0ms)) both`,
  },

  ".logo-bar": {
    transformOrigin: "left center",
    animation: `${wipeX} 400ms var(--mf-ease-out) ${entranceDelay(150)} both`,
  },

  ".logo-f": {
    animation: `${fadeIn} 300ms var(--mf-ease-out) ${entranceDelay(250)} both`,
  },

  // Shimmer over the logo bar (bar position and height in percent of the square logo)
  ".logo-shimmer": {
    position: "absolute",
    left: 0,
    right: 0,
    top: "45.02%",
    height: "5.27%",
    overflow: "hidden",
    pointerEvents: "none",
    animation: `${fadeIn} 200ms var(--mf-ease-out) ${entranceDelay(550)} both`,

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: "45%",
      background:
        "linear-gradient(90deg, transparent, var(--splash-shimmer-color) 50%, transparent)",
      transform: "translateX(-100%)",
      animation: `${shimmer} 1.2s linear ${entranceDelay(550)} infinite`,
    },
  },

  ".message-container": {
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    textAlign: "center",
    lineHeight: 1.2,
    width: "400px",
    maxWidth: "100%",

    ".title": {
      lineHeight: 1.2,
      marginBottom: "16px",
    },
  },

  // Loading messages share one grid cell, so the old one fades out where the new one fades in.
  ".messages": {
    display: "grid",
    width: "240px",
    maxWidth: "100%",
    animation: `${fadeIn} 300ms var(--mf-ease-out) ${entranceDelay(300)} both`,
  },

  ".splash-message": {
    gridArea: "1 / 1",
    transition: "opacity 150ms var(--mf-ease-out)",

    "&.is-leaving": {
      opacity: 0,
    },

    "&.is-entering": {
      animation: `${messageIn} 200ms var(--mf-ease-out) 110ms both`,
    },
  },

  ".message-block": {
    animation: `${messageIn} 300ms var(--mf-ease-out) ${entranceDelay(450)} both`,
  },

  // Exit: the whole splash fades out; the page below is usable at once.
  "&.is-exiting": {
    pointerEvents: "none",
    animation: `${fadeOut} 150ms var(--mf-ease-out) both`,
  },

  [REDUCED_MOTION]: {
    ".logo-m, .logo-f, .logo-bar, .messages, .message-block": {
      animation: "none",
      opacity: 1,
      transform: "none",
    },

    ".logo-shimmer": {
      display: "none",
    },

    ".splash-message.is-entering": {
      animationName: `${fadeIn}`,
    },
  },
});
