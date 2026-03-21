import { SxProps, Theme } from "@mui/material";

export const contentFilesStyles: SxProps<Theme> = (theme) => ({
  ".files-container": {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  ".file-item": {
    background: theme.vars.palette.background.paper,
    backgroundImage: theme.vars.overlays[10],
    width: "420px",
    maxWidth: "100%",

    // ".file-content": {
    //   margin: 0,
    //   padding: "16px 32px 0 32px",

    //   ".card-title": {
    //     fontSize: "1rem",
    //     marginBottom: "4px",
    //   },

    // },

    ".MuiTypography-body1, .text-item": {
      marginLeft: "10px",
      marginRight: "10px",
    },

    ".audio-player": {
      marginLeft: "-12px",
      marginRight: "-12px",
      marginTop: "8px",
    },

    ".file-actions": {
      marginTop: "4px",
    },
  },
});
