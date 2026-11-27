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

    // Set by `LazyPictureWithoutFallback` only for lazy images that were not loaded yet. An animation, not a
    // transition: callers set transitions of their own on the image (e.g. the grey partner logos), which would
    // replace an opacity transition.
    "&.is-fading-in": {
      opacity: 0,
    },

    "&.is-loaded": {
      animation: "mf-fade-in 250ms var(--mf-ease-out)",
    },
  },
};
