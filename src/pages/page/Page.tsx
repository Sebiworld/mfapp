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
import { SectionsContainer } from "@components/sections/SectionsContainer";
import { ContentBlocks } from "@components/contentBlocks/ContentBlocks";
import { pageStyles } from "./page.styles";
import { DefaultPageDto } from "@models/page/default-page-dto.model";
import WarningIcon from "@mui/icons-material/Warning";
import { useTranslation } from "react-i18next";
import { useGlobalStore } from "@src/store/global.store";
import { selectLoadPage, selectPage } from "@src/store/pages.store";

export const Page = () => {
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const { t, i18n } = useTranslation();

  const loadedPage = useGlobalStore(selectPage(currentPath));
  const page = loadedPage?.data;
  const loadPage = useGlobalStore(selectLoadPage);

  const isLoading = loadedPage?.status === "loading";
  console.log("pageLoadingStatus", loadedPage);

  useEffect(() => {
    loadPage(currentPath);
  }, [currentPath, loadPage]);

  // useEffect(() => {
  //   setPage(undefined);
  //   setIsLoading(true);
  //   MFApi.getPage(currentPath)
  //     .then((response) => {
  //       setPage(response.data);
  //       console.log('Page', response.data);
  //     })
  //     .catch((e) => {
  //       console.log('ERROR', e);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, [currentPath]);

  return (
    <Box className="page" data-testid="page" sx={pageStyles}>
      {page?.id ? (
        <>
          {page?.template?.name !== "home" && (
            <Sheet variant="soft" className="page-content">
              <Typography level="h1">{page.title}</Typography>

              {!!(page as DefaultPageDto)?.contents?.length && (
                <ContentBlocks
                  blocks={(page as DefaultPageDto).contents}
                ></ContentBlocks>
              )}
            </Sheet>
          )}

          {!!(page as DefaultPageDto)?.sections?.length && (
            <SectionsContainer sections={(page as DefaultPageDto).sections} />
          )}
        </>
      ) : (
        <>
          {loadedPage?.status === "success" && (
            <Sheet variant="soft" className="page-content message">
              {t("no-data")}
            </Sheet>
          )}
        </>
      )}

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
