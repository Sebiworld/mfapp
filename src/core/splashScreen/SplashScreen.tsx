import { splashScreenStyles } from "./splashScreen.styles";
import {
  CSSProperties,
  ReactElement,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { MfLogo } from "@components/mfLogo/MfLogo";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";
import { RemoveScroll } from "react-remove-scroll";
import { useReducedMotion } from "@utils/hooks/useReducedMotion";
import { useSplashMessage } from "./useSplashMessage";
import { getBootSplashElapsedMs, removeBootSplash } from "./bootSplash";

/** Time from the start of the exit until the splash is removed: a short fade of the whole splash plus a small reserve. */
export const SPLASH_EXIT_MS = 170;

export interface SplashScreenProps {
  visible?: boolean;
  variant?: "loading" | "maintenance";
  message?: ReactNode;
  onExited?: () => void;
}

interface SplashRootStyle extends CSSProperties {
  "--mf-splash-elapsed": string;
}

/**
 * Full-screen splash over the already rendered page: logo entrance, a shimmer on the logo bar while loading and a
 * short fade-out when the app is ready. The page below is usable from the start of the exit. It takes over the
 * static splash from `index.html`: entrance and shimmer continue where that one is, and the static one is removed
 * before the next paint.
 * @param visible `true` shows the splash; switching to `false` starts the exit right away.
 * @param variant `loading` rotates the loading messages and shows the shimmer; `maintenance` stays still.
 * @param message Content instead of the loading messages.
 * @param onExited Called once the splash is removed, or on mount when it never shows.
 * @returns The splash, or nothing once it is gone.
 */
export const SplashScreen = ({
  visible,
  variant = "loading",
  message,
  onExited,
}: SplashScreenProps): ReactElement | null => {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const [isRendered, setIsRendered] = useState(Boolean(visible));
  const [hasRotated, setHasRotated] = useState(false);
  const isVisibleAtMount = useRef(Boolean(visible));
  const onExitedRef = useRef(onExited);
  // Time the static splash has already played; every entrance delay subtracts it so the entrance does not restart.
  // A splash that only shows later starts its entrance from the beginning.
  const [rootStyle] = useState<SplashRootStyle>(() => ({
    "--mf-splash-elapsed": `${visible ? getBootSplashElapsedMs() : 0}ms`,
  }));

  if (visible && !isRendered) {
    setIsRendered(true);
  }

  const isExiting = !visible && isRendered;
  const isLoading = variant === "loading";
  const { current, previous } = useSplashMessage(
    isLoading && !message && isRendered && !isExiting
  );

  if (previous !== null && !hasRotated) {
    setHasRotated(true);
  }

  useEffect(() => {
    onExitedRef.current = onExited;
  });

  // Every instance removes it, so it also goes when no splash shows at all.
  useLayoutEffect(() => {
    removeBootSplash();
  }, []);

  useEffect(() => {
    if (!isVisibleAtMount.current) {
      onExitedRef.current?.();
    }
  }, []);

  useEffect(() => {
    if (!isExiting) {
      return;
    }

    const timer = setTimeout(() => {
      setIsRendered(false);
      onExitedRef.current?.();
    }, SPLASH_EXIT_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [isExiting]);

  if (!isRendered) {
    return null;
  }

  const classNames = [
    "splash-screen",
    `variant-${variant}`,
    isExiting ? "is-exiting" : "",
  ];

  return (
    <RemoveScroll enabled={!isExiting}>
      <Box
        className={classNames.filter(Boolean).join(" ")}
        data-testid="splash-screen"
        data-phase={isExiting ? "exiting" : "shown"}
        style={rootStyle}
        sx={splashScreenStyles}
      >
        <Box className="splash-content">
          <Box className="logo-container">
            <Box className="logo-wrap">
              <MfLogo layout="vertical"></MfLogo>
              {isLoading && !reduceMotion && <Box className="logo-shimmer" />}
            </Box>
          </Box>

          <Box className="message-container">
            {message ? (
              <Box className="message-block">{message}</Box>
            ) : (
              <Box className="messages">
                {previous !== null && (
                  <Typography
                    key={previous}
                    className="splash-message is-leaving"
                    data-testid="splash-message"
                    aria-hidden="true"
                  >
                    {t(`splash.${previous}`)}
                  </Typography>
                )}
                <Typography
                  key={current}
                  className={`splash-message${hasRotated ? " is-entering" : ""}`}
                  data-testid="splash-message"
                >
                  {t(`splash.${current}`)}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </RemoveScroll>
  );
};
