import { SxProps, Theme } from "@mui/material";
import { projectTitleFontSize } from "@components/nextPerformanceCard/nextPerformanceCard.styles";

/** Spacing for backend HTML: headings get room above unless first, blocks keep one rhythm. */
export const richTextStyles = {
  "h1, h2, h3, h4, h5, h6": {
    margin: "1.5em 0 0.5em",
    fontSize: "1.05rem",
    fontWeight: "bold",
    lineHeight: 1.3,
  },

  "p, ul, ol": {
    margin: "0 0 0.75em",
  },

  "ul, ol": {
    paddingLeft: "1.25em",
  },

  li: {
    marginBottom: "0.25em",
  },

  // A child without an element before it is the first child; written without ":first-child", which emotion
  // reports as unsafe for server rendering. ":first-of-type" would also match a heading after a paragraph.
  "&>:not(* + *), &>:is(h1, h2, h3, h4, h5, h6):not(* + *)": {
    marginTop: 0,
  },

  "&>:last-child": {
    marginBottom: 0,
  },
};

/** Paper of the directions popover and dialog; both render outside the page, so they carry their own styles. */
export const directionsPaperStyles: SxProps<Theme> = {
  ".directions-body": {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "16px",
    overflowWrap: "anywhere",
  },

  ".directions-text": {
    maxWidth: "100%",
    ...richTextStyles,
  },

  "&.directions-popover": {
    width: "min(480px, calc(100vw - 32px))",
    maxHeight: "min(70vh, 560px)",
    padding: "16px 24px",
    boxSizing: "border-box",
  },
};

export const performancePageStyles: SxProps<Theme> = (theme) => ({
  margin: "32px",
  marginBottom: "16px",
  padding: "32px 48px 48px 48px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "24px",
  borderRadius: "sm",
  boxShadow: "md",
  maxWidth: "1000px",
  background: theme.vars.palette.background.default,

  [theme.breakpoints.down("sm")]: {
    margin: "16px",
    padding: "16px 24px 24px 24px",
  },

  "&>section, &>header": {
    width: "100%",
  },

  ".performance-header": {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "8px",

    // Same size as the project title on the next-performance card.
    ".performance-title": {
      ...projectTitleFontSize(theme),
      lineHeight: "1.05",
      // Long compound words break at syllables (html lang is de) and only as a last resort anywhere else.
      hyphens: "auto",
      overflowWrap: "break-word",
    },

    ".performance-title .project-link": {
      color: "inherit",
      textDecoration: "none",

      "&:hover, &:focus-visible": {
        textDecoration: "underline",
      },
    },

    ".performance-subtitle": {
      fontSize: "clamp(1.15rem, 2.4vw, 1.5rem)",
      lineHeight: 1.2,
      fontWeight: 600,
      hyphens: "auto",
      overflowWrap: "break-word",

      [theme.breakpoints.down("sm")]: {
        fontSize: "1rem",
      },
    },

    ".performance-date": {
      fontSize: "1.25em",

      // Never above the line "category · title" on small screens, so the order of importance stays visible.
      [theme.breakpoints.down("sm")]: {
        fontSize: "1rem",
        fontWeight: 400,
      },
    },

    // The band runs from edge to edge of the page card, as on the next-performance card.
    ".filmstrip": {
      alignSelf: "stretch",
      margin: "8px -48px",

      [theme.breakpoints.down("sm")]: {
        marginX: "-24px",
      },
    },

    ".casts-container": {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
    },

    ".past-notice": {
      marginTop: "8px",
    },

    ".header-actions": {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      marginTop: "8px",

      "&:empty": {
        display: "none",
      },
    },
  },

  ".performance-visit": {
    display: "flex",
    flexDirection: "column",
    gap: "16px",

    ".visit-facts": {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px 32px",
      margin: 0,

      ".visit-fact": {
        display: "flex",
        flexDirection: "column",
      },

      dt: {
        fontWeight: "bold",
      },

      dd: {
        margin: 0,
      },
    },

    ".visit-block": {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "8px",
    },

    ".visit-text": {
      maxWidth: "100%",
      overflowWrap: "anywhere",

      ".location-title": {
        fontWeight: "bold",
      },

      ...richTextStyles,
    },
  },

  ".performance-roles": {
    display: "flex",
    flexDirection: "column",
    gap: "24px",

    ".performance-role-group": {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },

    // Two tiles per row on phones, as many as fit from the small breakpoint on.
    ".performance-tiles": {
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap: "12px",

      [theme.breakpoints.up("sm")]: {
        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
        gap: "16px",
      },
    },

    ".project-role-portrait": {
      maxWidth: "none",
      width: "100%",
      flex: "none",
    },
  },
});
