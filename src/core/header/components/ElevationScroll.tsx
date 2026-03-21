/* eslint-disable @typescript-eslint/no-explicit-any */
import { useScrollTrigger } from "@mui/material";
import React from "react";
import { ReactElement } from "react";

export const ElevationScroll = ({
  children,
  supportsTranslucentHeader,
}: {
  children?: ReactElement<any>;
  supportsTranslucentHeader?: boolean;
}) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  if (!supportsTranslucentHeader) {
    return children;
  }

  return React.isValidElement(children)
    ? React.cloneElement<any>(children, {
        // elevation: trigger ? 2 : 0,
        className: trigger ? "elevated" : "translucent",
      })
    : null;
};
