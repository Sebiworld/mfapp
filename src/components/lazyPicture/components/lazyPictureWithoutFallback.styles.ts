import { SxProps } from "@mui/material";

export const lazyPictureWithoutFallbackStyles: SxProps = {
  position: "relative",
  display: "block",
  width: "auto",
  height: "auto",

  img: {
    position: "relative",
    display: "block",
    width: "100%",
    height: "auto",
    maxWidth: "100%",
  },
};
