import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import { Interpolation, Theme } from "@mui/material";

export const lightgalleryStyles: Interpolation<Theme>[] = [
  {
    ".lg-container": {
      ".lg-backdrop.in": {
        zIndex: "calc(var(--mf-zIndex-appBar))",
      },
      ".lg-outer": {
        zIndex: "calc(var(--mf-zIndex-appBar))",
      },
    },
  },
];
