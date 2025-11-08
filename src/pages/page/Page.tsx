import { useEffect, useMemo, useRef } from "react";
import { pageStyles } from "./page.styles";
// import WarningIcon from "@mui/icons-material/Warning";
import { useTranslation } from "react-i18next";
import { useGlobalStore } from "@src/store/global.store";
import { PageContents } from "./pageContents/PageContents";
import { ProjectPage } from "./projectPage/ProjectPage";
import { LoadingOverlay } from "@components/loadingOverlay/LoadingOverlay";
import { Alert, AlertTitle, Box, Button, Typography } from "@mui/material";
import { convertHtmlEntities } from "@utils/functions/convertHtmlEntities";
import { Link, useLocation } from "react-router";
import { selectPage } from "@src/store/pages/pages.selectors";
import { pagesStoreActions } from "@src/store/pages/pages.actions";

export const Page = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { t, i18n } = useTranslation();

  const loadedPage = useGlobalStore(selectPage(currentPath));
  const page = loadedPage?.data;

  const isLoading = loadedPage?.status === "loading";

  useEffect(() => {
    pagesStoreActions.loadPage(currentPath);
  }, [currentPath, loadedPage?.data?.id]);

  // useEffect(() => {
  //   console.log("page", { page });
  // }, [page]);

  const title = useMemo(() => {
    return page?.title
      ? `${convertHtmlEntities(page?.title)} | Musical-Fabrik`
      : "Musical-Fabrik";
  }, [page?.title]);

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

  return (
    <Box
      className={`page template-${page?.template?.name || "unknown"}`}
      data-testid="page"
      sx={pageStyles}
    >
      <title>{title}</title>

      <ProjectPage page={page}>
        <LoadingOverlay
          visible={isLoading}
          onlyProgress={!!page?.id}
        ></LoadingOverlay>
        <PageContents page={page}></PageContents>
      </ProjectPage>

      {loadedPage?.status === "error" && (
        <Alert
          // startDecorator={<WarningIcon fontSize="large" />}
          className="alert"
          color="error"
        >
          <Box className="alert-content">
            {i18n.exists(`errors.${loadedPage?.code}`) ? (
              <>
                <AlertTitle className="alert-title">
                  {t(`errors.${loadedPage?.code}.title`)}
                </AlertTitle>

                <Typography className="alert-content">
                  {t(`errors.${loadedPage?.code}.description`)}
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
    </Box>
  );
};
