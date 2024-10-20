import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Sheet,
  Typography,
} from "@mui/joy";
import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { pageStyles } from "./page.styles";
import WarningIcon from "@mui/icons-material/Warning";
import { useTranslation } from "react-i18next";
import { useGlobalStore } from "@src/store/global.store";
import { selectLoadPage, selectPage } from "@src/store/pages.store";
import { PageContents } from "./pageContents/PageContents";
import { ProjectPage } from "./projectPage/ProjectPage";

export const Page = () => {
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const { t, i18n } = useTranslation();

  const loadedPage = useGlobalStore(selectPage(currentPath));
  const page = loadedPage?.data;
  const loadPage = useGlobalStore(selectLoadPage);

  const isLoading = loadedPage?.status === "loading";

  useEffect(() => {
    loadPage(currentPath);
  }, [currentPath, loadPage]);

  useEffect(() => {
    console.log("page", { page });
  }, [page]);

  return (
    <Box className="page" data-testid="page" sx={pageStyles}>
      <ProjectPage page={page}>
        <PageContents page={page}></PageContents>
      </ProjectPage>

      {isLoading && (
        <Sheet variant="soft" className="page-content message">
          <CircularProgress />
          {t("loading")}
        </Sheet>
      )}

      {loadedPage?.status === "error" && (
        <Alert
          startDecorator={<WarningIcon />}
          variant="solid"
          className="alert"
          color="danger"
        >
          <Box className="alert-content">
            {i18n.exists(`errors.${loadedPage?.code}`) ? (
              <>
                <Typography className="alert-title" level="h2">
                  {t(`errors.${loadedPage?.code}.title`)}
                </Typography>
                <Typography className="alert-content">
                  {t(`errors.${loadedPage?.code}.description`)}
                </Typography>
                <Button color="light" component={Link} to="/">
                  {t("actions.back-to-home")}
                </Button>
              </>
            ) : (
              <>
                <Typography className="alert-title" level="h2">
                  {t(`errors.default_error.title`)}
                </Typography>
                <Typography className="alert-content">
                  {t(`errors.default_error.description`)}
                </Typography>
                <Button color="light" component={Link} to="/">
                  {t("actions.back-to-home")}
                </Button>
              </>
            )}
          </Box>
        </Alert>
      )}
    </Box>
  );
};
