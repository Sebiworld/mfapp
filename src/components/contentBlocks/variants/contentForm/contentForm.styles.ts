import { SxProps, Theme } from "@mui/material";
import { gridLayoutStyles } from "@styles/utils/gridLayout.styles";

export const contentFormStyles: SxProps<Theme> = (theme) => ({
  position: "relative",
  display: "grid",

  // One column of fields reads best at the measure of running text; doubled so the content blocks' 100 % cap
  // does not override it.
  "&.content-form.content-form": {
    maxWidth: "38em",
  },
  gap: "16px",
  gridTemplateColumns: "1fr",
  paddingTop: "32px",

  ".form-group": gridLayoutStyles,

  // Fieldsets stack in one column; inside, fields take the share of the row the CMS sets as column width.
  ".form-group.form-group": {
    alignSelf: "flex-start",
    gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
    gap: "20px 16px",

    "& > .layout-block": {
      gridColumn: "span var(--column-span, 12)",

      // Too narrow for side-by-side fields: a label like "Hausnummer" would wrap and push its field down.
      [theme.breakpoints.down("sm")]: {
        gridColumn: "1 / -1",
      },
    },

    "& > .form-group": {
      gridColumn: "1 / -1",
    },

    // A titled fieldset starts a new section; one without a title just continues the fields.
    "& > .form-group:has(> .form-group-label)": {
      marginTop: "28px",
    },

    "p, h1, h2, h3, h4, h5, h6": {
      width: "auto",
      maxWidth: "100%",
    },

    "& > .form-group-label": {
      margin: 0,
      paddingTop: "16px",
      borderTop: `1px solid ${theme.vars.palette.divider}`,
      fontSize: "1.25rem",
      lineHeight: 1.2,
      fontWeight: 700,
    },
  },

  ".content-form-input": {
    gap: "4px",

    // Options and markup carry their label as text; set it like the labels of the other fields.
    "&:not(.content-form-input-checkbox) > .form-input-label": {
      alignSelf: "flex-start",
      textAlign: "left",
      fontWeight: 700,
    },

    ".form-input-label": {
      color: theme.vars.palette.contrast[500],
    },

    ".form-input-description, .form-markup": {
      color: theme.vars.palette.contrast[600],
      fontSize: "14px",
    },

    ".MuiFormHelperText-root": {
      alignSelf: "flex-start",
    },

    "&.content-form-input-text": {
      ".form-input-description, .form-markup": {
        marginBottom: "8px",
      },
    },

    "&.content-form-input-checkbox": {
      ".form-input-label-container": {
        gap: "8px",
      },
    },

    ".form-input-error": {
      color: theme.vars.palette.error.main,
      fontSize: "14px",
    },
  },

  ".form-actions": {
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    justifyContent: "flex-start",
  },

  ".hp-field": {
    display: "none",
    visibility: "hidden",
  },

  // Spam trap: off-screen instead of display:none, which bots tend to skip.
  ".hp-website": {
    position: "absolute",
    left: "-10000px",
    top: "auto",
    width: "1px",
    height: "1px",
    overflow: "hidden",
    opacity: 0,
    pointerEvents: "none",
  },

  ".form-messages": {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    overflow: "hidden",
  },
});
