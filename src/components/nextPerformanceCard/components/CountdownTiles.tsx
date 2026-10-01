import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getCountdown } from "../functions/getCountdown";

type CountdownUnit = "days" | "hours" | "minutes" | "seconds";

const UNITS: CountdownUnit[] = ["days", "hours", "minutes", "seconds"];

interface CountdownTilesProps {
  /** Target as Unix timestamp in seconds. */
  targetSeconds: number;
  /** Current time in milliseconds. */
  nowMs: number;
  size: "large" | "small";
  /** Text shown above the tiles. */
  label: string;
}

/**
 * Shows the time left until a target as tiles for days, hours, minutes and seconds. Every digit is keyed by its
 * value, so a changed digit mounts anew and plays the roll-in animation while unchanged digits stay put.
 * The small variant leaves out the days tile while it shows zero.
 * @param targetSeconds Target in seconds.
 * @param nowMs Current time in milliseconds.
 * @param size `large` for the main countdown, `small` for a secondary one.
 * @param label Text above the tiles.
 */
export const CountdownTiles: FC<CountdownTilesProps> = ({
  targetSeconds,
  nowMs,
  size,
  label,
}) => {
  const { t } = useTranslation();
  const countdown = getCountdown(targetSeconds, nowMs);

  const units = UNITS.filter(
    (unit) => !(unit === "days" && size === "small" && countdown.days === 0)
  );

  // The timer role is not announced on every tick; the label carries the value without seconds.
  const ariaLabel = [
    label,
    ...units
      .filter(
        (unit) =>
          unit !== "seconds" && !(unit === "days" && countdown.days === 0)
      )
      .map((unit) =>
        t(`next_performance.countdown.${unit}-long`, {
          count: countdown[unit],
        })
      ),
  ].join(" ");

  return (
    <Box
      className={`countdown countdown-${size}`}
      data-testid={`countdown-${size}`}
      role="timer"
      aria-label={ariaLabel}
    >
      <Typography className="countdown-label" component="p">
        {label}
      </Typography>

      <Box className="countdown-tiles" aria-hidden="true">
        {units.map((unit) => {
          const digits = String(countdown[unit]).padStart(2, "0").split("");

          return (
            <Box className="countdown-tile" key={unit}>
              <Box
                className="countdown-value"
                data-testid={`countdown-${unit}`}
              >
                {digits.map((digit, index) => (
                  <span
                    className="countdown-digit"
                    key={`${digits.length - index}-${digit}`}
                  >
                    {digit}
                  </span>
                ))}
              </Box>

              <span className="countdown-unit">
                {t(`next_performance.countdown.${unit}`, {
                  count: countdown[unit],
                })}
              </span>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
