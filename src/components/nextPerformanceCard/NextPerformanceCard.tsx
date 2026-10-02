import { FC, Fragment } from "react";
import { Link } from "react-router";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { Box, Button, Chip, Paper, Typography } from "@mui/material";
import { useShallow } from "zustand/shallow";
import { useGlobalStore } from "@src/store/global.store";
import { selectProjectCssVars } from "@src/store/projects/projects.selectors";
import {
  AdmissionTimes,
  getAdmissionTimes,
} from "@pages/performancePage/functions/getPerformanceTimes";
import { getPerformanceHeadline } from "@pages/performancePage/functions/getPerformanceHeadline";
import { formatBerlinDate } from "@utils/functions/formatBerlinDate";
import { formatBerlinTime } from "@utils/functions/formatBerlinTime";
import { getPerformanceUrl } from "@utils/functions/getPerformanceUrl";
import { parseHtml } from "@utils/functions/parseHtml";
import { isSameBerlinDay } from "@utils/functions/isSameBerlinDay";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { CountdownTiles } from "./components/CountdownTiles";
import { PerformanceFilmstrip } from "@components/performanceFilmstrip/PerformanceFilmstrip";
import { nextPerformanceCardStyles } from "./nextPerformanceCard.styles";
import { useFilmstripItems } from "@components/performanceFilmstrip/useFilmstripItems";
import { useNextPerformanceCard } from "./useNextPerformanceCard";
import { NextPerformanceCardPhase } from "./functions/getNextPerformanceCardState";

export interface NextPerformanceCardProps {
  /** Project page id; without it performances of all projects are considered. */
  projectId?: number;
  /** Shows the project title, for places outside the project. */
  showProject?: boolean;
  /** Hides the card while the next performance is further away than this many days. */
  maxDaysAhead?: number;
  /** Centers the card, for full-width pages without a sidebar. */
  centered?: boolean;
  /** Lays the card out compactly from medium screens on (one row on large screens), so it fits below a hero. */
  strip?: boolean;
}

/**
 * Builds the admission line below the date.
 * @param phase Current phase of the card.
 * @param admission Opening times of foyer and hall.
 * @param t Translation function.
 * @returns Text, or `null` when the phase has no admission line.
 */
const getAdmissionLine = (
  phase: NextPerformanceCardPhase,
  admission: AdmissionTimes,
  t: TFunction
): string | null => {
  const { common, foyer, hall } = admission;

  // While the foyer is open only the hall is still ahead.
  if (phase === "foyer") {
    return hall !== null
      ? t("next_performance.hall-from", { time: formatBerlinTime(hall) })
      : null;
  }

  if (phase !== "before") {
    return null;
  }

  if (common !== null) {
    return t("next_performance.admission-from", {
      time: formatBerlinTime(common),
    });
  }

  if (foyer !== null && hall !== null) {
    return t("next_performance.admission-both", {
      foyer: formatBerlinTime(foyer),
      hall: formatBerlinTime(hall),
    });
  }

  return null;
};

/**
 * Highlights the next performance with a countdown to its start. From the start of admission until the end the
 * card switches to the current performance and shows its cast as a filmstrip; afterwards it moves on to the next
 * date. Without a current or upcoming performance nothing is rendered.
 * @param projectId Project page id, or none for all projects.
 * @param showProject Whether the project title is shown.
 * @param maxDaysAhead Optional limit for how far ahead the card looks.
 * @param centered Whether the card is centered horizontally.
 * @param strip Whether the card is laid out compactly from medium screens on.
 * With `showProject` the card takes the colour of the performance's project when the project has one.
 */
export const NextPerformanceCard: FC<NextPerformanceCardProps> = ({
  projectId,
  showProject,
  maxDaysAhead,
  centered,
  strip,
}) => {
  const { t } = useTranslation();
  const { state, nowMs } = useNextPerformanceCard(projectId, maxDaysAhead);
  const filmstripItems = useFilmstripItems(
    state && state.phase !== "before" ? state.performance.id : null
  );

  // Outside the project the card wears the colour of the project it is about, as the project page does.
  const projectCssVars = useGlobalStore(
    useShallow(
      selectProjectCssVars(
        showProject ? state?.performance.project.id : undefined
      )
    )
  );

  if (!state) {
    return null;
  }

  const { phase, performance, countdownTarget } = state;
  // Category and title of the performance in one line; when one is missing the other stands alone.
  const headlineNodes = getPerformanceHeadline(performance).map(
    (part, index) => (
      <Fragment key={index}>
        {index > 0 && " · "}
        {parseHtml(part)}
      </Fragment>
    )
  );
  const admissionLine = getAdmissionLine(
    phase,
    getAdmissionTimes(performance),
    t
  );
  // Once the performance runs, online tickets are no longer an option.
  const ticketUrl = phase !== "running" ? performance.ticket_url : null;
  // Until the day of the performance the card sells tickets; on the day itself visitors come for the details.
  const ticketsLead =
    !!ticketUrl && !isSameBerlinDay(performance.timestamp, nowMs);

  const infoButton = (
    <Button
      variant={ticketsLead ? "outlined" : "contained"}
      color="projectPrimary"
      component={Link}
      to={getPerformanceUrl(performance.project.url, performance.id)}
      data-testid="next-performance-link"
    >
      {t("next_performance.to-performance")}
    </Button>
  );
  const ticketsButton = !!ticketUrl && (
    <Button
      variant={ticketsLead ? "contained" : "outlined"}
      color="projectPrimary"
      href={ticketUrl}
      target="_blank"
      rel="noopener noreferrer"
      endIcon={<OpenInNewIcon aria-hidden="true" />}
      data-testid="next-performance-tickets"
    >
      {t("next_performance.tickets")}
    </Button>
  );

  const actions = (
    <Box className="card-actions">
      {ticketsLead ? (
        <>
          {ticketsButton}
          {infoButton}
        </>
      ) : (
        <>
          {infoButton}
          {ticketsButton}
        </>
      )}
    </Box>
  );
  const filmstrip = phase !== "before" && (
    <PerformanceFilmstrip items={filmstripItems} />
  );

  return (
    <Paper
      component="section"
      elevation={0}
      className={`next-performance-card phase-${phase}${centered ? " is-centered" : ""}${strip ? " is-strip" : ""}`}
      data-testid="next-performance-card"
      data-phase={phase}
      aria-labelledby="next-performance-status"
      sx={
        projectCssVars
          ? [nextPerformanceCardStyles, projectCssVars]
          : nextPerformanceCardStyles
      }
    >
      <Box className="card-status">
        {phase !== "before" && <span className="live-dot" aria-hidden="true" />}

        <Typography
          id="next-performance-status"
          className="status-text"
          data-testid="next-performance-status"
          component="p"
        >
          {t(`next_performance.status-${phase}`)}
        </Typography>
      </Box>

      <Box className="card-body">
        <Box className="card-info">
          {showProject ? (
            <>
              <Typography variant="h2" className="card-title">
                <Link
                  className="project-link"
                  to={performance.project.url}
                  data-testid="next-performance-project"
                >
                  {parseHtml(performance.project.title)}
                </Link>
              </Typography>

              {headlineNodes.length > 0 && (
                <Typography className="card-subtitle" component="p">
                  {headlineNodes}
                </Typography>
              )}
            </>
          ) : (
            <Typography variant="h2" className="card-title">
              {headlineNodes}
            </Typography>
          )}

          <Box className="card-meta" data-testid="next-performance-meta">
            <Typography className="card-date">
              {t("performance.time-suffix", {
                time: formatBerlinDate(performance.timestamp),
              })}
            </Typography>

            {admissionLine !== null && (
              <Typography
                className="card-admission"
                data-testid="next-performance-admission"
              >
                {admissionLine}
              </Typography>
            )}

            {performance.casts?.length > 0 && (
              <Box className="casts-container">
                {performance.casts.map((cast) => (
                  <Chip key={cast.id} label={cast.title} size="small" />
                ))}
              </Box>
            )}
          </Box>
        </Box>

        {countdownTarget && (
          <CountdownTiles
            targetSeconds={countdownTarget.timestamp}
            nowMs={nowMs}
            size={phase === "before" ? "large" : "small"}
            label={t(
              phase === "running"
                ? "next_performance.next-in"
                : "next_performance.starts-in"
            )}
          />
        )}
      </Box>

      {/* In the strip the actions sit beside the info, so they come before the filmstrip in tab order too. */}
      {!strip && filmstrip}
      {actions}
      {!!strip && filmstrip}
    </Paper>
  );
};
