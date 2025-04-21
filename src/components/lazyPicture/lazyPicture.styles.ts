import { SxProps, Theme } from "@mui/material";

export const lazyPictureStyles: SxProps<Theme> = (theme) => ({
  position: "relative",
  display: "block",
  width: "auto",
  height: "auto",
  marginBlockStart: 0,
  marginBlockEnd: 0,
  marginInlineStart: 0,
  marginInlineEnd: 0,

  ".image-caption": {
    position: "absolute",
    top: "0",
    right: "0",
    padding: "4px",
    fontSize: "10px",
    backgroundColor: `rgba(${theme.vars.palette.light.mainChannel} / 0.2)`,
    color: `${theme.vars.palette.light.contrastText}`,
    opacity: 0.6,
  },
});

