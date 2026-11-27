import { keyframes } from "@emotion/react";
import { SxProps, Theme } from "@mui/material";
import { SPINE_MS } from "./getBranchDelays";

const LINE_COLOR = "var(--mf-palette-contrast-900)";

const drawY = keyframes`
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
`;

const wipeX = keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
`;

/**
 * Styles of the project sidebar. The 4px lines are pseudo elements over transparent borders of the same width, so
 * they can draw once (edge down, underlines branching off) without moving the layout.
 * @param theme App theme.
 * @returns Style object for both sidebars.
 */
export const projectSidebarStyles: SxProps<Theme> = (theme: Theme) => ({
  position: "relative",
  padding: "20px 40px",
  flexDirection: "column",
  gap: "40px",
  borderRight: "4px solid transparent",
  display: "none",

  "&:not(.mobile)::after": {
    content: '""',
    position: "absolute",
    top: 0,
    bottom: 0,
    right: "-4px",
    width: "4px",
    background: LINE_COLOR,
    transformOrigin: "top",
    pointerEvents: "none",
  },

  "&.mobile": {
    display: "flex",
    flexDirection: "row",
    gap: "4px",
    flexWrap: "wrap",
    padding: 0,
    margin: "16px 32px",
    border: "0 none",
  },

  [theme.breakpoints.up("md")]: {
    display: "flex",

    "&.mobile.mobile": {
      display: "none",
    },
  },

  ".sidebar-box": {
    "&>.box-title": {
      ...theme.typography.h5,
      position: "relative",
      paddingBottom: "4px",
      borderBottom: "4px solid transparent",
      marginBottom: "12px",
      paddingX: "16px",

      "&::after": {
        content: '""',
        position: "absolute",
        left: 0,
        right: 0,
        bottom: "-4px",
        height: "4px",
        background: LINE_COLOR,
        transformOrigin: "right",
        pointerEvents: "none",
      },
    },
  },

  "&.is-armed::after": {
    transform: "scaleY(0)",
  },

  "&.is-armed .sidebar-box > .box-title::after": {
    transform: "scaleX(0)",
  },

  "&.is-playing::after": {
    animation: `${drawY} ${SPINE_MS}ms linear both`,
  },

  "&.is-playing .sidebar-box > .box-title::after": {
    animation: `${wipeX} 380ms var(--mf-ease-out) var(--d, 0ms) both`,
  },

  "&.is-paused::after, &.is-paused .sidebar-box > .box-title::after": {
    animationPlayState: "paused",
  },

  "@media (prefers-reduced-motion: reduce)": {
    "&.is-armed::after, &.is-playing::after, &.is-armed .sidebar-box > .box-title::after, &.is-playing .sidebar-box > .box-title::after":
      {
        transform: "none",
        animation: "none",
      },
  },
});
