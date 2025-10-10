import { useEffect, useMemo } from "react";
import { pageStyles } from "./page.styles";
// import WarningIcon from "@mui/icons-material/Warning";
import { useTranslation } from "react-i18next";
import { useGlobalStore } from "@src/store/global.store";
import { selectLoadPage, selectPage } from "@src/store/pages.store";
import { PageContents } from "./pageContents/PageContents";
import { ProjectPage } from "./projectPage/ProjectPage";
import { LoadingOverlay } from "@components/loadingOverlay/LoadingOverlay";
import { Alert, AlertTitle, Box, Button, Typography } from "@mui/material";
import { convertHtmlEntities } from "@utils/functions/convertHtmlEntities";
import { Link, useLocation } from "react-router";

export const Page = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { t, i18n } = useTranslation();

  const loadedPage = useGlobalStore(selectPage(currentPath));
  const page = loadedPage?.data;
  const loadPage = useGlobalStore(selectLoadPage);

  const isLoading = loadedPage?.status === "loading";

  useEffect(() => {
    loadPage(currentPath);
  }, [currentPath, loadPage, loadedPage?.data?.id]);

  // useEffect(() => {
  //   console.log("page", { page });
  // }, [page]);

  const title = useMemo(() => {
    return page?.title
      ? `${convertHtmlEntities(page?.title)} | Musical-Fabrik`
      : "Musical-Fabrik";
  }, [page?.title]);

  return (
    <Box
      className={`page template-${page?.template?.name || "unknown"}`}
      data-testid="page"
      sx={pageStyles}
    >
      <title>{title}</title>

      <ProjectPage page={page}>
        <PageContents page={page}></PageContents>
        {isLoading && <LoadingOverlay overlay={!!page?.id}></LoadingOverlay>}
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
