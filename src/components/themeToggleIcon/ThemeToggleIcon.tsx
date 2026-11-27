import { ReactElement, useId } from "react";
import { SvgIcon } from "@mui/material";
import { themeToggleIconStyles } from "./themeToggleIcon.styles";

export interface ThemeToggleIconProps {
  mode: "light" | "dark";
}

// Short rays between radius 8.4 and 10.4 around the centre (12, 12), every 45 degrees.
const RAYS: [number, number, number, number][] = [
  [12, 1.6, 12, 3.6],
  [12, 20.4, 12, 22.4],
  [1.6, 12, 3.6, 12],
  [20.4, 12, 22.4, 12],
  [4.65, 4.65, 6.06, 6.06],
  [17.94, 17.94, 19.35, 19.35],
  [4.65, 19.35, 6.06, 17.94],
  [17.94, 6.06, 19.35, 4.65],
];

/**
 * Sun in the light and moon in the dark colour scheme, one drawing that changes shape instead of two swapped icons.
 * The crescent is cut out of the core with a mask, so it shows the surface behind the button, whatever its colour
 * (also the hover and focus background of the button).
 * @param props.mode Colour scheme shown; `dark` sets the class `is-dark` that turns the sun into the moon.
 * @returns Decorative SVG; the button around it carries the name.
 */
export const ThemeToggleIcon = ({
  mode,
}: ThemeToggleIconProps): ReactElement => {
  // useId may contain characters that are not safe inside url(#…).
  const maskId = `theme-toggle-bite-${useId().replace(/[^\w-]/g, "")}`;

  return (
    <SvgIcon
      className={
        mode === "dark" ? "theme-toggle-icon is-dark" : "theme-toggle-icon"
      }
      sx={themeToggleIconStyles}
    >
      <defs>
        <mask id={maskId}>
          <rect width="24" height="24" fill="#fff" />
          <circle className="bite" cx="16.4" cy="7.6" r="5.6" />
        </mask>
      </defs>
      <g className="rays">
        {RAYS.map(([x1, y1, x2, y2]) => (
          <line key={`${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
      </g>
      <g mask={`url(#${maskId})`}>
        <circle className="core" cx="12" cy="12" r="5" />
      </g>
    </SvgIcon>
  );
};
