import { SxProps } from "@mui/material";

export const lazyPictureStyles: SxProps = {
  position: "relative",
  display: "block",
  width: "auto",
  height: "auto",
  marginBlockStart: 0,
  marginBlockEnd: 0,
  marginInlineStart: 0,
  marginInlineEnd: 0,
};

export const lazyPictureWithoutFallbackStyles: SxProps = {
  position: "relative",
  display: "block",
  width: "auto",
  height: "auto",

  img: {
    position: "relative",
    display: "block",
    width: "auto",
    height: "auto",
    maxWidth: "100%",
  },
};
