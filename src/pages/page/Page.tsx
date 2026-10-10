import { useCallback, useEffect, useRef, useState } from "react";
import { pageStyles } from "./page.styles";
// import WarningIcon from "@mui/icons-material/Warning";
import { useGlobalStore } from "@src/store/global.store";
import { PageContents } from "./pageContents/PageContents";
import { ProjectPage } from "./projectPage/ProjectPage";
import { LoadingOverlay } from "@components/loadingOverlay/LoadingOverlay";
import { Box } from "@mui/material";
import { useLocation } from "react-router";
import {
  isShowableStoredPage,
  selectPage,
} from "@src/store/pages/pages.selectors";
import { SeoHeaders } from "@components/SeoHeaders";
import { Breadcrumbs } from "@components/breadcrumbs/Breadcrumbs";
import { useAppContext } from "@src/context/appContext/useAppContext";
import { usePagesApi } from "@api/hooks/usePagesApi";
import {
  findProjectOfPath,
  usePrefetchProjectData,
} from "@api/hooks/usePrefetchProjectData";
import { selectProjects } from "@src/store/projects/projects.selectors";
import { useShowPageBelowHeader } from "@core/header/useTranslucentHeader";
import { PageDtoVariant } from "@models/page/page-dto-variant.model";
import { isError } from "@utils/functions/isError";
import { ErrorResponseDto } from "@models/error-response-dto.model";
import { AxiosError } from "axios";
import { ErrorCard } from "@components/errorCard/ErrorCard";

export const Page = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { loadPage } = usePagesApi();
  const prefetchProjectData = usePrefetchProjectData();

  const page = useGlobalStore(selectPage(currentPath));

  // Every path change starts a new request; only the response to the newest request is kept, so a slower
  // earlier one (also for the same path, e.g. A -> B -> A) can neither end loading nor overwrite the result.
  // `hadPage` tells whether a stored copy of the page could be shown while the request runs.
  const [request, setRequest] = useState({
    path: currentPath,
    id: 0,
    hadPage: isShowableStoredPage(page),
  });

  if (request.path !== currentPath) {
    setRequest({
      path: currentPath,
      id: request.id + 1,
      hadPage: isShowableStoredPage(page),
    });
  }

  // Settles the promise of `reloadPage` once the next request has an answer. Starting a request ends the one before,
  // so the next answer that arrives always belongs to the reload.
  const reloadWaiter = useRef<((isOpen: boolean) => void) | null>(null);

  // Requests the shown page again (after it was opened with its password); the locked view stays until then.
  // Resolves with whether the page arrived open, so the password form can be used again otherwise.
  const reloadPage = useCallback(
    (): Promise<boolean> =>
      new Promise((resolve) => {
        reloadWaiter.current?.(false);
        reloadWaiter.current = resolve;
        setRequest((current) => ({
          ...current,
          id: current.id + 1,
          hadPage: true,
        }));
      }),
    []
  );

  const requestId = request.id;
  const hadPage = request.hadPage;
  const [loadResult, setLoadResult] = useState<{
    requestId: number;
    response: PageDtoVariant | true | Error;
  } | null>(null);
  const loadResponse = loadResult?.response ?? null;
  const isLoading = loadResult?.requestId !== requestId;

  useEffect(() => {
    let isCurrent = true;

    const load = async () => {
      const response = await loadPage(currentPath);

      // A page shown for the first time waits for its project data, so sidebar and next performance card do
      // not push the content down when they arrive.
      if (
        isCurrent &&
        !hadPage &&
        response !== true &&
        !isError(response) &&
        response?.project_id
      ) {
        await prefetchProjectData(
          response.project_id,
          response.template?.name === "project"
        );
      }

      if (isCurrent) {
        setLoadResult({ requestId, response });

        const isOpen =
          response !== true && !isError(response) && response?.locked !== true;
        reloadWaiter.current?.(isOpen);
        reloadWaiter.current = null;
      }
    };

    load();

    return () => {
      isCurrent = false;
    };
  }, [currentPath, hadPage, loadPage, prefetchProjectData, requestId]);

  // The project data of a page shown for the first time is requested as soon as the project is known from the
  // path, without waiting for the page; the wait after the page answer then shares these requests.
  const projects = useGlobalStore(selectProjects);

  useEffect(() => {
    if (hadPage || !isLoading) {
      return;
    }

    const project = findProjectOfPath(projects, currentPath);

    if (!project) {
      return;
    }

    void prefetchProjectData(project.id, project.url === currentPath);
  }, [currentPath, hadPage, isLoading, prefetchProjectData, projects]);

  // useEffect(() => {
  //   console.log("page", { page });
  // }, [page]);

  const lastHash = useRef("");

  // listen to location change using useEffect with location as dependency
  // https://jasonwatmore.com/react-router-v6-listen-to-location-route-change-without-history-listen
  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (location.hash) {
      lastHash.current = location.hash.slice(1); // safe hash for further use after navigation
    }

    if (lastHash.current && document.getElementById(lastHash.current)) {
      setTimeout(() => {
        document
          .getElementById(lastHash.current)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
        lastHash.current = "";
      }, 100);
    }
  }, [location, isLoading]);

  const appContext = useAppContext();

  useEffect(() => {
    if (!page?.id) {
      return;
    }

    const matomo = appContext.matomoInstance;
    if (!matomo) {
      return;
    }

    matomo.trackPageView();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page?.id]);

  // Until the first content is complete, nothing of the page is shown (it may already be in the store).
  const isAwaitingContent = isLoading && !hadPage;
  const shownPage = isAwaitingContent ? undefined : page;
  useShowPageBelowHeader(shownPage);

  return (
    <Box
      className={`page template-${shownPage?.template?.name || "unknown"}${isAwaitingContent ? " is-awaiting-content" : ""}`}
      data-testid="page"
      sx={pageStyles}
    >
      {page?.id && <SeoHeaders page={page}></SeoHeaders>}

      <ProjectPage page={shownPage}>
        <LoadingOverlay
          visible={isLoading}
          onlyProgress={!!shownPage?.id}
        ></LoadingOverlay>
        <PageContents page={shownPage} onUnlocked={reloadPage}></PageContents>
      </ProjectPage>

      {isError(loadResponse) && (
        <ErrorCard
          errorResponse={loadResponse as AxiosError<ErrorResponseDto>}
        />
      )}

      <Breadcrumbs items={shownPage?.breadcrumbs}></Breadcrumbs>
    </Box>
  );
};
