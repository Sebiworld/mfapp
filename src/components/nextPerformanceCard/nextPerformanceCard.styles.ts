import { keyframes } from "@emotion/react";
import { Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";

const digitRoll = keyframes`
  from {
    transform: translateY(-55%);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const livePulse = keyframes`
  0%, 100% {
    opacity: 1;
  }

  50% {
    opacity: 0.35;
  }
`;

const REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";

/**
 * Size of the project title that leads the card and the performance page, so both headings read the same.
 * @param theme App theme.
 * @returns Font size with its small-screen value.
 */
export const projectTitleFontSize = (
  theme: Theme
): SystemStyleObject<Theme> => ({
  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",

  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
  },
});

export const nextPerformanceCardStyles = (
  theme: Theme
): SystemStyleObject<Theme> => ({
  margin: "32px",
  marginBottom: 0,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  borderRadius: "sm",
  boxShadow: "md",
  maxWidth: "1000px",

  "&.is-centered": {
    maxWidth: "800px",
    marginX: "auto",
    marginBottom: "32px",
    width: "calc(100% - 64px)",
  },

  [theme.breakpoints.down("sm")]: {
    margin: "16px",
    marginBottom: 0,

    "&.is-centered": {
      marginX: "16px",
      marginBottom: "16px",
      width: "auto",
    },
  },

  ".card-status": {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 48px",
    background: theme.vars.palette.projectPrimary.main,
    color: theme.vars.palette.projectPrimary.contrastText,

    [theme.breakpoints.down("sm")]: {
      padding: "8px 24px",
    },

    ".status-text": {
      fontWeight: "bold",
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      fontSize: "0.85rem",
    },

    ".live-dot": {
      width: "10px",
      height: "10px",
      flex: "none",
      borderRadius: "50%",
      background: "currentColor",
      animation: `${livePulse} 1.6s ease-in-out infinite`,

      [REDUCED_MOTION]: {
        animation: "none",
      },
    },
  },

  ".card-body": {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "24px 40px",
    padding: "24px 48px 0",

    [theme.breakpoints.down("sm")]: {
      padding: "16px 24px 0",
      gap: "20px",
    },
  },

  ".card-info": {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "8px",
    flex: "1 1 280px",
    minWidth: 0,

    ".card-title": {
      ...projectTitleFontSize(theme),
      lineHeight: 1.05,
      fontWeight: 700,
      // Long compound words break at syllables (html lang is de) and only as a last resort anywhere else.
      hyphens: "auto",
      overflowWrap: "break-word",
    },

    ".card-title .project-link": {
      color: "inherit",
      textDecoration: "none",

      "&:hover, &:focus-visible": {
        textDecoration: "underline",
      },
    },

    ".card-subtitle": {
      fontSize: "clamp(1.15rem, 2.4vw, 1.5rem)",
      lineHeight: 1.2,
      fontWeight: 600,
      hyphens: "auto",
      overflowWrap: "break-word",

      // Stays clearly below the project title, which is only 1.5rem on small screens.
      [theme.breakpoints.down("sm")]: {
        fontSize: "1rem",
      },
    },

    ".card-date": {
      fontSize: "1.15em",

      // Never above the line "category · title" on small screens, so the order of importance stays visible.
      [theme.breakpoints.down("sm")]: {
        fontSize: "1rem",
        fontWeight: 400,
      },
    },

    ".card-admission": {
      fontWeight: "bold",
    },

    ".casts-container": {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
    },
  },

  ".countdown": {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: "none",

    ".countdown-label": {
      fontSize: "0.85rem",
      fontWeight: "bold",
      letterSpacing: "0.04em",
      textTransform: "uppercase",
    },

    ".countdown-tiles": {
      display: "flex",
      gap: "8px",
    },

    ".countdown-tile": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "6px",
    },

    ".countdown-value": {
      display: "flex",
      justifyContent: "center",
      minWidth: "64px",
      padding: "10px 8px",
      overflow: "hidden",
      borderRadius: "6px",
      background: theme.vars.palette.projectPrimary.main,
      color: theme.vars.palette.projectPrimary.contrastText,
      fontSize: "2.25rem",
      fontWeight: 700,
      lineHeight: 1,
      fontVariantNumeric: "tabular-nums",
      boxShadow: "inset 0 -2px 0 rgba(0, 0, 0, 0.15)",
    },

    ".countdown-digit": {
      display: "inline-block",
      animation: `${digitRoll} 380ms cubic-bezier(0.2, 0.8, 0.3, 1)`,

      [REDUCED_MOTION]: {
        animation: "none",
      },
    },

    ".countdown-unit": {
      fontSize: "0.75rem",
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      opacity: 0.8,
    },

    "&.countdown-small": {
      gap: "4px",

      ".countdown-tiles": {
        gap: "6px",
      },

      ".countdown-value": {
        minWidth: "40px",
        padding: "6px",
        fontSize: "1.25rem",
      },

      ".countdown-unit": {
        fontSize: "0.65rem",
      },
    },

    [theme.breakpoints.down("sm")]: {
      "&.countdown-large": {
        width: "100%",

        ".countdown-tiles": {
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        },

        ".countdown-value": {
          minWidth: 0,
          fontSize: "1.9rem",
        },
      },
    },
  },

  // The band runs from edge to edge of the card below the info.
  ".filmstrip": {
    marginTop: "24px",
  },

  ".card-actions": {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    padding: "24px 48px 32px",

    [theme.breakpoints.down("sm")]: {
      padding: "20px 24px 24px",
    },
  },
});
