import { mfTheme } from "@styles/theme/mfTheme";
import { Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";

export const projectPageStyles = (theme: Theme): SystemStyleObject<Theme> => ({
  ".project-header": {
    gridArea: "header",

    ".main-image": {
      display: "flex",
      flexDirection: "column",

      ".MuiAspectRatio-root": {
        border: "0 none",
        borderRadius: 0,
      },
    },

    ".project-subheader": {
      position: "relative",
      minHeight: "90px",
      paddingTop: "56px",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },

    ".project-teaser": {
      position: "absolute",
      top: "-28px",
      left: 0,
      borderRadius: 0,
      padding: "16px",
      backgroundColor: theme.vars.palette.projectPrimary.main,
      color: theme.vars.palette.projectPrimary.contrastText,
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

  ".project-main-content": {
    position: "relative",
  },

  [mfTheme.breakpoints.up("md")]: {
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
