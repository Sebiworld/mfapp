import { SxProps, Theme } from "@mui/material";

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

  "&>:first-child, &>:first-child:is(h1, h2, h3, h4, h5, h6)": {
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

    ".project-link": {
      fontWeight: "bold",
    },

    ".performance-title": {
      lineHeight: "1.05",
    },

    ".performance-date": {
      fontSize: "1.25em",
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
