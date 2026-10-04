import { FC, Fragment, useEffect, useMemo, useState } from "react";
import { useLocation, Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Box, Button, Chip, Paper, Typography } from "@mui/material";
import { Page } from "@pages/page/Page";
import { ProjectPage } from "@pages/page/projectPage/ProjectPage";
import { SeoHeaders } from "@components/SeoHeaders";
import { ErrorCard } from "@components/errorCard/ErrorCard";
import { PerformanceFilmstrip } from "@components/performanceFilmstrip/PerformanceFilmstrip";
import {
  collectFilmstripItems,
  FilmstripItem,
} from "@components/performanceFilmstrip/functions/collectFilmstripItems";
import { LoadingOverlay } from "@components/loadingOverlay/LoadingOverlay";
import { usePerformancesApi } from "@api/hooks/usePerformancesApi";
import { useAppContext } from "@src/context/appContext/useAppContext";
import { PageDto } from "@models/page/page-dto.model";
import { ErrorResponseDto } from "@models/error-response-dto.model";
import { PerformanceDetailDto } from "@models/utility-types/performance-detail-dto.model";
import { AxiosError } from "axios";
import { formatBerlinDate } from "@utils/functions/formatBerlinDate";
import { getPerformanceIdFromPath } from "@utils/functions/getPerformanceIdFromPath";
import { isError } from "@utils/functions/isError";
import { parseHtml } from "@utils/functions/parseHtml";
import { PerformanceVisitInfo } from "./components/PerformanceVisitInfo";
import { PerformanceRoles } from "./components/PerformanceRoles";
import { PerformanceDirections } from "./components/PerformanceDirections";
import { getPerformanceHeadline } from "./functions/getPerformanceHeadline";
import {
  getDurationLabel,
  getPerformanceStatus,
} from "./functions/getPerformanceTimes";
import { performancePageStyles } from "./performancePage.styles";
import { awaitingContentStyles } from "@pages/page/page.styles";
import {
  findProjectOfPath,
  usePrefetchProjectData,
} from "@api/hooks/usePrefetchProjectData";
import { useGlobalStore } from "@src/store/global.store";
import { selectProjects } from "@src/store/projects/projects.selectors";

const CLOCK_INTERVAL_MS = 30_000;

/** Keeps the footer below the first screen while the performance loads, like on CMS pages. */
const performancePageFrameStyles = {
  "&.is-awaiting-content": awaitingContentStyles,
};

/** One shared empty list keeps the filmstrip input stable while nothing is loaded. */
const NO_FILMSTRIP_ITEMS: FilmstripItem[] = [];

interface LoadResult {
  id: number;
  response: PerformanceDetailDto | Error;
}

/**
 * Lists the seasons of the performance.
 * @param performance The loaded performance.
 * @returns Season ids; empty when the performance has no season.
 */
const getSeasonIds = (performance: PerformanceDetailDto): number[] =>
  (performance.seasons ?? []).map((season) => season.id);

/**
 * Builds the page object the shared SEO component reads.
 * @param performance The loaded performance.
 * @param title Display title of the performance.
 * @param pathname Current path.
 * @param description Short description for search results.
 */
const buildSeoPage = (
  performance: PerformanceDetailDto,
  title: string,
  pathname: string,
  description: string
): PageDto => ({
  id: performance.id,
  name: String(performance.id),
  language: "de",
  url: pathname,
  httpUrl: `${window.location.origin}${pathname}`,
  template: { id: 0, name: "performance", label: "Aufführung" },
  created: 0,
  modified: 0,
  title,
  project_id: performance.project.id,
  seo: { title: `${title} – ${performance.project.title}`, description },
});

interface PerformanceViewProps {
  performanceId: number;
}

const PerformanceView: FC<PerformanceViewProps> = ({ performanceId }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { loadPerformance } = usePerformancesApi();
  const prefetchProjectData = usePrefetchProjectData();
  const appContext = useAppContext();

  const [result, setResult] = useState<LoadResult | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    let isCurrent = true;

    const load = async () => {
      const response = await loadPerformance(performanceId);

      // The project sidebar would push the performance down when its data arrives after it.
      if (isCurrent && !isError(response) && response.project?.id) {
        await prefetchProjectData(response.project.id, false);
      }

      if (isCurrent) {
        setResult({ id: performanceId, response });
      }
    };

    void load();

    return () => {
      isCurrent = false;
    };
  }, [loadPerformance, performanceId, prefetchProjectData]);

  // The project is known from the path before the performance answers, so its data is requested right away.
  const projects = useGlobalStore(selectProjects);
  const isLoading = result?.id !== performanceId;

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    const project = findProjectOfPath(projects, location.pathname);

    if (project) {
      void prefetchProjectData(project.id, false);
    }
  }, [isLoading, location.pathname, prefetchProjectData, projects]);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), CLOCK_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  const response = isLoading ? null : result.response;
  const performance = response && !isError(response) ? response : null;

  useEffect(() => {
    if (!performance?.id) {
      return;
    }

    appContext.matomoInstance?.trackPageView();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [performance?.id]);

  const title = performance?.title || performance?.event?.title || "";

  const seoPage = useMemo((): PageDto | null => {
    if (!performance) {
      return null;
    }

    const place = performance.location?.title;
    const description = [
      performance.timestamp === null
        ? null
        : formatBerlinDate(performance.timestamp),
      place,
    ]
      .filter(Boolean)
      .join(" · ");

    return buildSeoPage(performance, title, location.pathname, description);
  }, [location.pathname, performance, title]);

  // Built once per loaded performance, so the clock does not repaint the band.
  const filmstripItems = useMemo(
    () =>
      performance ? collectFilmstripItems(performance) : NO_FILMSTRIP_ITEMS,
    [performance]
  );

  // Category and title of the performance in one line below the project; when one is missing the other stands alone.
  const headlineNodes = performance
    ? getPerformanceHeadline(performance).map((part, index) => (
        <Fragment key={index}>
          {index > 0 && " · "}
          {parseHtml(part)}
        </Fragment>
      ))
    : [];

  const durationLabel = performance ? getDurationLabel(performance, t) : null;
  const status = performance ? getPerformanceStatus(performance, now) : null;

  return (
    <Box
      className={`page template-performance${isLoading ? " is-awaiting-content" : ""}`}
      data-testid="performance-page"
      sx={performancePageFrameStyles}
    >
      {seoPage && <SeoHeaders page={seoPage} />}

      <ProjectPage
        page={performance ? { project_id: performance.project.id } : undefined}
      >
        <LoadingOverlay visible={isLoading} />

        {performance && status && (
          <Paper
            component="main"
            role="main"
            elevation={0}
            className="performance-content"
            data-testid="performance-content"
            sx={performancePageStyles}
          >
            <Box component="header" className="performance-header">
              <Typography
                variant="h1"
                component="h1"
                className="performance-title"
              >
                <Link
                  className="project-link"
                  to={performance.project.url}
                  data-testid="performance-project"
                >
                  {parseHtml(performance.project.title)}
                </Link>
              </Typography>

              {headlineNodes.length > 0 && (
                <Typography
                  className="performance-subtitle"
                  data-testid="performance-subtitle"
                  component="p"
                >
                  {headlineNodes}
                </Typography>
              )}

              {performance.timestamp !== null && (
                <Typography className="performance-date">
                  {t("performance.time-suffix", {
                    time: formatBerlinDate(performance.timestamp),
                  })}
                  {durationLabel && ` (${durationLabel})`}
                </Typography>
              )}

              {performance.casts.length > 0 && (
                <Box
                  className="casts-container"
                  data-testid="performance-casts"
                >
                  {performance.casts.map((cast) => (
                    <Chip key={cast.id} label={cast.title} size="small" />
                  ))}
                </Box>
              )}

              {status.hasEnded && (
                <Typography className="past-notice" data-testid="past-notice">
                  {t("performance.past-notice")}
                </Typography>
              )}

              <Box className="header-actions">
                {!status.ticketsClosed && performance.ticket_url && (
                  <Button
                    className="ticket-button"
                    data-testid="ticket-button"
                    variant="contained"
                    color="projectPrimary"
                    href={performance.ticket_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("project.events.get-tickets")}
                  </Button>
                )}

                <PerformanceDirections location={performance.location} />
              </Box>

              {/* Below the actions, so tickets and directions stay right under the date. */}
              <PerformanceFilmstrip items={filmstripItems} />
            </Box>

            <PerformanceVisitInfo performance={performance} />

            <PerformanceRoles
              roles={performance.roles}
              seasonIds={getSeasonIds(performance)}
            />
          </Paper>
        )}

        {response && isError(response) && (
          <ErrorCard errorResponse={response as AxiosError<ErrorResponseDto>} />
        )}
      </ProjectPage>
    </Box>
  );
};

/**
 * Performance page below a project path of any depth. Paths without a numeric id belong to regular pages and are
 * handed to the generic page renderer.
 */
export const PerformancePage: FC = () => {
  const { pathname } = useLocation();
  const performanceId = getPerformanceIdFromPath(pathname);

  if (performanceId === null) {
    return <Page />;
  }

  return <PerformanceView performanceId={performanceId} />;
};
