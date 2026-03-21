import { SxProps, Theme } from "@mui/material";

export const contentYoutubeVideoStyles: SxProps<Theme> = (theme) => ({
  ".player-wrapper": {
    width: "800px",
    maxWidth: "100%",
    marginLeft: "auto",
    marginRight: "auto",
  },

  ".video-placeholder": {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: "100%",

    "&>img, &>picture": {
      position: "relative",
      overflow: "hidden",
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },

    ".placeholder-title-wrapper": {
      position: "absolute",
      top: "16px",
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",

      ".placeholder-title": {
        position: "relative",
        display: "inline-flex",
        zIndex: 1,
        backgroundColor: `rgba(${theme.vars.palette.dark.mainChannel}/0.8)`,
        color: theme.vars.palette.dark.contrastText,
        padding: "4px 8px",
        fontWeight: "bold",
      },
    },
  },
});
