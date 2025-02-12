import { Interpolation } from "@emotion/react";
import { Theme } from "@mui/material";

/*
 * Gives a fixed aspect ratio to an HTML container.
 *
 * Use (for a 3 to 1 aspect ratio):
 * 	 <div class="aspect-ratio ar-3-1">
 * 	 	<div class="ar-content">
 * 	 		// Here could be contents of your choice...
 * 	 	</div>
 * 	 </div>
 */
export const globalAspectRatioStyles: Interpolation<Theme>[] = [
  {
    ".aspect-ratio": {
      position: "relative",
      width: "100%",
      overflow: "hidden",

      "&::before": {
        display: "block",
        content: '""',
        width: "100%",
        paddingTop: "100%",
      },

      "&>.ar-content": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        marginLeft: 0,
        marginRight: 0,

        "&>img, &>picture, &.img-fluid": {
          width: "100%",
          height: "100%",
          objectFit: "cover",
          fontFamily: "object-fit: cover",
        },

        "&.bg-image": {
          // backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        },
      },

      "&>img.ar-content, &>picture.ar-content, &>div.ar-content": {
        objectFit: "cover",
        fontFamily: "object-fit: cover",
      },

      "&.ar-1-1:before": {
        paddingTop: "100%",
      },
      "&.ar-2-1:before": {
        paddingTop: "50%",
      },
      "&.ar-1-2:before": {
        paddingTop: "200%",
      },
      "&.ar-3-1:before": {
        paddingTop: "33.33%",
      },
      "&.ar-1-3:before": {
        paddingTop: "300%",
      },
      "&.ar-4-1:before": {
        paddingTop: "25%",
      },
      "&.ar-1-4:before": {
        paddingTop: "400%",
      },
      "&.ar-4-3:before": {
        paddingTop: "75%",
      },
      "&.ar-3-4:before": {
        paddingTop: "133.33%",
      },
      "&.ar-16-9:before": {
        paddingTop: "56.25%",
      },
      "&.ar-9-16:before": {
        paddingTop: "177.77%",
      },
      "&.ar-5-2:before": {
        paddingTop: "40%",
      },
      "&.ar-8-5:before": {
        paddingTop: "62.5%",
      },
    },
  },
];
