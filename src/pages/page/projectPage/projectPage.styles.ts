import { Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";

export const projectPageStyles = (theme: Theme): SystemStyleObject<Theme> => ({
  ".project-header": {
    gridArea: "header",

    ".main-image": {
      display: "flex",
      flexDirection: "column",
      maxWidth: "100%",
      width: "1900px",

      ".MuiAspectRatio-root": {
        border: "0 none",
        borderRadius: 0,
      },
    },

    ".project-subheader": {
      position: "relative",
      // minHeight: "90px",
      paddingTop: "20px",
      paddingLeft: "64px",
      paddingRight: "64px",
      display: "flex",
      flexDirection: "column",
      gap: "4px",

      ".project-menu": {
        display: "flex",
        flexDirection: "row",
        gap: "16px",
        // marginTop: "16px",

        "&.empty": {
          display: "none",
        },
      },
    },

    ".project-teaser": {
      display: "block",

      [theme.breakpoints.down("md")]: {
        backgroundColor: "transparent",
        boxShadow: "none",
        backgroundImage: "none",
      },
    },
  },

  ".layout-wrapper": {
    position: "relative",
    display: "block",
    width: "100%",
  },

  ".project-sidebar-wrapper": {
    position: "relative",

    ".project-sidebar": {
      position: "relative",
    },
  },

  ".project-title": {
    fontSize: "32px",
    lineHeight: "1.0",
    fontWeight: 700,
  },

  ".project-main-content": {
    position: "relative",
  },

  [theme.breakpoints.up("sm")]: {
    ".project-subheader.project-subheader": {
      flexDirection: "row",
    },
  },

  [theme.breakpoints.up("md")]: {
    ".layout-wrapper.layout-wrapper": {
      display: "flex",
      flexDirection: "row",
    },

    ".project-sidebar-wrapper": {
      padding: "20px 0",
      order: 1,
      width: "550px",
      maxWidth: "33%",
      flexGrow: 0,
      flexShrink: 0,
      marginRight: "-2px",
      zIndex: 1,
    },

    ".project-subheader.project-subheader.project-subheader": {
      flexDirection: "row",
      paddingTop: "42px",
      paddingLeft: "0",
      paddingRight: "0",

      ".project-teaser.project-teaser": {
        position: "absolute",
        display: "block",
        top: "-28px",
        left: 0,
        padding: "16px",
        backgroundColor: theme.vars.palette.projectPrimary.main,
        color: theme.vars.palette.projectPrimary.contrastText,
        borderRadius: 0,
      },

      ".project-meta": {
        padding: "20px 40px",
        width: "550px",
        maxWidth: "33%",
        flexGrow: 0,
        flexShrink: 0,
        marginRight: "-2px",
        zIndex: 1,
        textAlign: "right",
      },
    },

    ".project-main-content": {
      order: 2,
      maxWidth: "67%",
      width: "auto",
      flexGrow: 1,
      flexShrink: 1,
    },
  },
});
