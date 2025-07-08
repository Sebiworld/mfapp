import { SxProps, Theme } from "@mui/material";

export const projectRoleStyles: SxProps<Theme> = (theme) => ({
  ".casts-container": {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    paddingLeft: "48px",
    paddingRight: "48px",

    ".cast": {
      ".cast-title": {
        textAlign: "center",
        borderLeft: `1px solid ${theme.palette.contrast[50]}`,
        borderRight: `1px solid ${theme.palette.contrast[50]}`,
        paddingLeft: "16px",
        paddingRight: "16px",
      },

      "&:first-of-type": {
        ".cast-title": {
          borderLeft: "0 none",
        },
      },

      "&:last-of-type": {
        ".cast-title": {
          borderRight: "0 none",
        },
      },
    },

    "&.casts-2": {
      ".cast": {
        "&:first-of-type": {
          ".cast-title": {
            textAlign: "right",
          },

          ".portraits-container": {
            justifyContent: "flex-end",
          },
        },

        "&:last-of-type": {
          ".cast-title": {
            textAlign: "left",
          },

          ".portraits-container": {
            justifyContent: "flex-start",
          },
        },
      },
    },
  },

  ".subroles-container": {
    display: "flex",
    flexDirection: "column",
    gap: "82px",
  },

  ".project-subrole": {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",

    ".subrole-title": {
      textAlign: "center",
      paddingLeft: "16px",
      paddingRight: "16px",
    },

    ".subrole-description": {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      paddingLeft: "16px",
      paddingRight: "16px",
    },

    ".subrole-actions": {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: "8px",
      flexWrap: "wrap",
    },
  },

  ".group-image": {
    position: "relative",
    width: "600px",
    maxWidth: "100%",
    paddingLeft: "16px",
    paddingRight: "16px",

    "&>*": {
      position: "relative",
      objectFit: "contain",
      width: "100%",
    },

    figcaption: {
      display: "none",
    },
  },

  ".portraits-container": {
    display: "flex",
    gap: "8px",
    paddingTop: "16px",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
    paddingLeft: "16px",
    paddingRight: "16px",
  },

  ".project-role-portrait": {
    width: "220px",
    maxWidth: "100%",

    ".portrait-image": {
      width: "220px",
    },

    ".portrait-title": {
      textAlign: "center",
      fontSize: "16px",
      lineHeight: "1.2",
    },
  },
});
