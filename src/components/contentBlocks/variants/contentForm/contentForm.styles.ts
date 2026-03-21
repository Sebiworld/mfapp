import { SxProps, Theme } from "@mui/material";
import { gridLayoutStyles } from "@styles/utils/gridLayout.styles";

export const contentFormStyles: SxProps<Theme> = (theme) => ({
  position: "relative",
  display: "grid",
  gap: "16px",
  gridTemplateColumns: "1fr",
  paddingTop: "32px",

  ".form-group": gridLayoutStyles,

  ".form-group.form-group": {
    // position: "relative",
    alignSelf: "flex-start",
    // gridColumnEnd: "span 12",
    gap: "16px",

    // [theme.breakpoints.down("md")]: {
    //   gridColumn: "span 6",
    // },

    // "&>*": {
    //   position: "relative",
    //   // flex: "1 1 auto",
    //   gridColumn: "span 12",
    // },

    "&.root": {
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "repeat(12, 1fr)",
      },

      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "repeat(6, 1fr)",
      },

      "&>.form-group": {
        gridColumn: "span 6",
      },
    },

    "p, h1, h2, h3, h4, h5, h6": {
      width: "auto",
      maxWidth: "100%",
    },

    "&>.form-group-label, &>.title-placeholder": {
      position: "relative",
      fontSize: "14px",
      lineHeight: "16px",
      minHeight: "22px",
      display: "flex",
      flexDirection: "row",
      gap: "8px",
      paddingRight: "16px",
      alignItems: "center",
      fontWeight: "lighter",
      marginBottom: "-4px",
      color: theme.vars.palette.contrast[600],

      "&>*": {
        flex: "0 0 auto",
      },

      "&>hr": {
        height: "1px",
        flex: "1 1 8px",
        border: "0 none",
        background: theme.vars.palette.contrast[800],

        "&:first-of-type": {
          width: "8px",
          flex: "0 0 auto",
        },
      },
    },
  },

  ".content-form-input": {
    gap: "4px",

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

  ".form-messages": {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    overflow: "hidden",
  }
});
