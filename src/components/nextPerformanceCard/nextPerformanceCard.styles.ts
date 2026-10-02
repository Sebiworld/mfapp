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

  // One row of info, countdown and actions; status bar and filmstrip span the full width. The component puts the
  // actions before the filmstrip, so reading and tab order follow the row.
  "&.is-strip": {
    [theme.breakpoints.up("lg")]: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 1fr) auto auto",
      columnGap: "40px",
      maxWidth: "1100px",
      marginTop: "24px",

      ".card-status": {
        gridColumn: "1 / -1",
      },

      ".card-body": {
        display: "contents",
      },

      ".card-info": {
        padding: "20px 0 24px 48px",
        gap: "4px",
      },

      ".card-info .card-meta": {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "4px 16px",
      },

      ".countdown": {
        alignSelf: "center",
      },

      // Fixed column, so the actions stay at the right edge when there is no countdown.
      ".card-actions": {
        gridColumn: "3",
        flexDirection: "column",
        alignSelf: "center",
        padding: "0 48px 0 0",
      },

      ".filmstrip": {
        gridColumn: "1 / -1",
        marginTop: 0,
      },
    },
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
      gap: "8px",
      padding: "6px 24px",
    },

    ".status-text": {
      fontWeight: "bold",
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      fontSize: "0.85rem",

      [theme.breakpoints.down("sm")]: {
        fontSize: "0.75rem",
        letterSpacing: "0.02em",
      },
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
      gap: "16px",
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

    // A plain pass-through on larger screens, so date, admission and casts stay single rows of the column.
    ".card-meta": {
      display: "contents",

      [theme.breakpoints.down("sm")]: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "8px",

        // Date and casts share a line; the admission time keeps its own line below without changing the reading order.
        ".card-admission": {
          order: 1,
          flexBasis: "100%",
        },
      },
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
      borderRadius: 0,
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

    // One compact row: label beside small tiles, left-aligned; the tiles wrap below only when the row is too narrow.
    [theme.breakpoints.down("sm")]: {
      // Both sizes, so the small variant's own tile rules do not outrank these.
      "&.countdown-large, &.countdown-small": {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "6px 10px",

        ".countdown-label": {
          maxWidth: "7.5rem",
          fontSize: "0.75rem",
          letterSpacing: "0.02em",
          lineHeight: 1.25,
        },

        ".countdown-tiles": {
          gap: "4px",
        },

        ".countdown-tile": {
          gap: "2px",
        },

        ".countdown-value": {
          minWidth: "36px",
          padding: "6px",
          fontSize: "1.25rem",
        },

        ".countdown-unit": {
          fontSize: "0.65rem",
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
      padding: "16px 24px 20px",

      // Smaller text and side padding keep both buttons in one row; the height stays a comfortable touch target.
      ".MuiButton-root": {
        minHeight: "40px",
        paddingLeft: "12px",
        paddingRight: "12px",
        fontSize: "0.8125rem",
      },
    },
  },
});
