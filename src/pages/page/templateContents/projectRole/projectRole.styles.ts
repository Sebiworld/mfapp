import { SxProps, Theme } from "@mui/material";

export const projectRoleStyles: SxProps<Theme> = (theme) => ({
  ".season-selection": {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: '32px'
  },

  ".casts-container": {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    paddingLeft: "48px",
    paddingRight: "48px",

    ".project-role-portraits": {
      width: "100%",
    },

    ".portraits-container": {
      paddingLeft: 0,
      paddingRight: 0,
    },

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

      ".portraits-container": {
        paddingLeft: "16px",
        paddingRight: "16px",
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

    ".project-role-portraits": {
      width: "100%",
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
    gap: "16px",
    paddingTop: "16px",
    width: "100%",
    paddingLeft: "32px",
    paddingRight: "32px",
    // display: "grid",
    // gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    display: 'flex',
    flexWrap: 'wrap',

  },

  ".project-role-portrait": {
    display: 'flex',
    position: 'relative',
    maxWidth: "160px",
    flex: "1 1 160px",

    ".MuiCardContent-root": {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },

    ".portrait-title": {
      textAlign: "center",
      fontSize: "15px",
      lineHeight: "1.2",
    },

    ".portrait-role": {
      textAlign: "center",
      fontSize: "14px",
      lineHeight: "1.2",
    },
  },
});
