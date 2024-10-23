import { SxProps } from "@mui/joy/styles/types";
import { mfTheme } from "@styles/theme/mfTheme";

export const projectPageStyles: SxProps = {
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

  ":root:root:root": {
    "--mf-palette-projectPrimary-500": "green"
  }
};
