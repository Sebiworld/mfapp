import { FC, Fragment } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Box, Button, Chip, Paper, Typography } from "@mui/material";
import { useShallow } from "zustand/shallow";
import { useGlobalStore } from "@src/store/global.store";
import { selectProjectCssVars } from "@src/store/projects/projects.selectors";
import { getAdmissionTimestamp } from "@pages/performancePage/functions/getPerformanceTimes";
import { getPerformanceHeadline } from "@pages/performancePage/functions/getPerformanceHeadline";
import { formatBerlinDate } from "@utils/functions/formatBerlinDate";
import { formatBerlinTime } from "@utils/functions/formatBerlinTime";
import { getPerformanceUrl } from "@utils/functions/getPerformanceUrl";
import { parseHtml } from "@utils/functions/parseHtml";
import { CountdownTiles } from "./components/CountdownTiles";
import { PerformanceFilmstrip } from "@components/performanceFilmstrip/PerformanceFilmstrip";
import { nextPerformanceCardStyles } from "./nextPerformanceCard.styles";
import { useFilmstripItems } from "@components/performanceFilmstrip/useFilmstripItems";
import { useNextPerformanceCard } from "./useNextPerformanceCard";

export interface NextPerformanceCardProps {
  /** Project page id; without it performances of all projects are considered. */
  projectId?: number;
  /** Shows the project title, for places outside the project. */
  showProject?: boolean;
  /** Hides the card while the next performance is further away than this many days. */
  maxDaysAhead?: number;
  /** Centers the card, for full-width pages without a sidebar. */
  centered?: boolean;
}

/**
 * Highlights the next performance with a countdown to its start. From the start of admission until the end the
 * card switches to the running performance and shows its cast as a filmstrip; afterwards it moves on to the next
 * date. Without a current or upcoming performance nothing is rendered.
 * @param projectId Project page id, or none for all projects.
 * @param showProject Whether the project title is shown.
 * @param maxDaysAhead Optional limit for how far ahead the card looks.
 * @param centered Whether the card is centered horizontally.
 * With `showProject` the card takes the colour of the performance's project when the project has one.
 */
export const NextPerformanceCard: FC<NextPerformanceCardProps> = ({
  projectId,
  showProject,
  maxDaysAhead,
  centered,
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
  const admission = getAdmissionTimestamp(performance);

  return (
    <Paper
      component="section"
      elevation={0}
      className={`next-performance-card phase-${phase}${centered ? " is-centered" : ""}`}
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

          <Typography className="card-date">
            {t("performance.time-suffix", {
              time: formatBerlinDate(performance.timestamp),
            })}
          </Typography>

          {phase === "before" && admission !== null && (
            <Typography
              className="card-admission"
              data-testid="next-performance-admission"
            >
              {t("next_performance.admission-from", {
                time: formatBerlinTime(admission),
              })}
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

      {phase !== "before" && <PerformanceFilmstrip items={filmstripItems} />}

      <Box className="card-actions">
        <Button
          variant="contained"
          color="projectPrimary"
          component={Link}
          to={getPerformanceUrl(performance.project.url, performance.id)}
          data-testid="next-performance-link"
        >
          {t("next_performance.to-performance")}
        </Button>

        {phase !== "running" && performance.ticket_url && (
          <Button
            variant="outlined"
            color="projectPrimary"
            href={performance.ticket_url}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="next-performance-tickets"
          >
            {t("next_performance.tickets")}
          </Button>
        )}
      </Box>
    </Paper>
  );
};
