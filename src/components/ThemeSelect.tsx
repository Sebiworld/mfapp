import { MouseEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import { ThemeToggleIcon } from "@components/themeToggleIcon/ThemeToggleIcon";
import { startColorModeTransition } from "@utils/functions/startColorModeTransition";
import { useReducedMotion } from "@utils/hooks/useReducedMotion";

/**
 * Switches between the light and the dark colour scheme; the new colours spread as a circle from the button.
 * @returns The button, or nothing until the colour scheme is known.
 */
export default function ThemeSelect(): ReactElement | null {
  const { t } = useTranslation();
  const { mode, setMode } = useColorScheme();
  const reducedMotion = useReducedMotion();

  // mode stays undefined until the color scheme is known on the client (e.g. without noSsr).
  if (!mode) {
    return null;
  }

  const isLight = mode === "light";
  const label = t(isLight ? "theme_select.to_dark" : "theme_select.to_light");

  /**
   * Starts the switch from the middle of the clicked button.
   * @param event Click on the button, also sent for Enter and Space.
   */
  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    const rect = event.currentTarget.getBoundingClientRect();

    startColorModeTransition(
      () => setMode(isLight ? "dark" : "light"),
      { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
      reducedMotion
    );
  };

  return (
    <IconButton aria-label={label} title={label} onClick={handleClick}>
      <ThemeToggleIcon mode={isLight ? "light" : "dark"} />
    </IconButton>
  );
}
