import { useScrollTrigger } from "@mui/material";
import React from "react";
import { ReactElement } from "react";

export const ElevationScroll = ({
  children,
  supportsTranslucentHeader,
}: {
  children?: ReactElement;
  supportsTranslucentHeader?: boolean;
}) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  if (!supportsTranslucentHeader) {
    return children;
  }

  return children
    ? React.cloneElement(children, {
        // elevation: trigger ? 2 : 0,
        className: trigger ? "elevated" : "translucent",
      })
    : null;
};
