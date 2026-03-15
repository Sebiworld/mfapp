import { useCallback, useEffect, useRef, useState } from "react";
import { pageStyles } from "./page.styles";
// import WarningIcon from "@mui/icons-material/Warning";
import { useGlobalStore } from "@src/store/global.store";
import { PageContents } from "./pageContents/PageContents";
import { ProjectPage } from "./projectPage/ProjectPage";
import { LoadingOverlay } from "@components/loadingOverlay/LoadingOverlay";
import { Box } from "@mui/material";
import { useLocation } from "react-router";
import { selectPage } from "@src/store/pages/pages.selectors";
import { SeoHeaders } from "@components/SeoHeaders";
import { Breadcrumbs } from "@components/breadcrumbs/Breadcrumbs";
import { useAppContext } from "@src/context/appContext/useAppContext";
import { usePagesApi } from "@api/hooks/usePagesApi";
import { PageDtoVariant } from "@models/page/page-dto-variant.model";
import { isError } from "@utils/functions/isError";
import { ErrorResponseDto } from "@models/error-response-dto.model";
import { AxiosError } from "axios";
import { ErrorCard } from "@components/errorCard/ErrorCard";

export const Page = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { loadPage } = usePagesApi();

  const [loadResponse, setLoadResponse] = useState<
    PageDtoVariant | true | Error | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const page = useGlobalStore(selectPage(currentPath));

  const load = useCallback(async () => {
    setIsLoading(true);

    const response = await loadPage(currentPath);
    setLoadResponse(response);

    setIsLoading(false);
  }, [currentPath, loadPage]);

  useEffect(() => {
    load();
  }, [currentPath, load]);

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

  return (
    <Box
      className={`page template-${page?.template?.name || "unknown"}`}
      data-testid="page"
      sx={pageStyles}
    >
      {page?.id && <SeoHeaders page={page}></SeoHeaders>}

      <ProjectPage page={page}>
        <LoadingOverlay
          visible={isLoading}
          onlyProgress={!!page?.id}
        ></LoadingOverlay>
        <PageContents page={page}></PageContents>
      </ProjectPage>

      {isError(loadResponse) && (
        <ErrorCard
          errorResponse={loadResponse as AxiosError<ErrorResponseDto>}
        />
      )}

      <Breadcrumbs items={page?.breadcrumbs}></Breadcrumbs>
    </Box>
  );
};
