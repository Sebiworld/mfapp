import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { pageStyles } from "./page.styles";
// import WarningIcon from "@mui/icons-material/Warning";
import { useTranslation } from "react-i18next";
import { useGlobalStore } from "@src/store/global.store";
import { PageContents } from "./pageContents/PageContents";
import { ProjectPage } from "./projectPage/ProjectPage";
import { LoadingOverlay } from "@components/loadingOverlay/LoadingOverlay";
import { Alert, AlertTitle, Box, Button, Typography } from "@mui/material";
import { Link, useLocation } from "react-router";
import { selectPage } from "@src/store/pages/pages.selectors";
import { SeoHeaders } from "@components/SeoHeaders";
import { Breadcrumbs } from "@components/breadcrumbs/Breadcrumbs";
import { useAppContext } from "@src/context/appContext/useAppContext";
import { usePagesApi } from "@api/hooks/usePagesApi";
import { PageDtoVariant } from "@models/page/page-dto-variant.model";
import { isError } from "@utils/functions/isError";
import { ErrorResponseDto } from "@models/error-response-dto.model";
import { AxiosError } from "axios";

export const Page = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { t, i18n } = useTranslation();
  const { loadPage } = usePagesApi();

  const [loadResponse, setLoadResponse] = useState<
    PageDtoVariant | true | Error | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const errorResponse = useMemo(() => {
    if (!isError(loadResponse)) {
      return null;
    }

    return loadResponse as unknown as AxiosError<ErrorResponseDto>;
  }, [loadResponse]);

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
        <Alert
          // startDecorator={<WarningIcon fontSize="large" />}
          className="alert"
          color="error"
        >
          <Box className="alert-content">
            {i18n.exists(`errors.${errorResponse?.code}`) ? (
              <>
                <AlertTitle className="alert-title">
                  {t(`errors.${errorResponse?.code}.title`)}
                </AlertTitle>

                <Typography className="alert-content">
                  {t(`errors.${errorResponse?.code}.description`)}
                </Typography>

                <Box className="alert-footer">
                  <Button color="light" component={Link} to="/">
                    {t("actions.back-to-home")}
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <AlertTitle className="alert-title">
                  {t(`error.default_error.title`)}
                </AlertTitle>

                <Typography className="alert-content">
                  {t(`error.default_error.description`)}
                </Typography>

                <Box className="alert-footer">
                  <Button color="light" component={Link} to="/">
                    {t("general.actions.back-to-home")}
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Alert>
      )}

      <Breadcrumbs items={page?.breadcrumbs}></Breadcrumbs>
    </Box>
  );
};
