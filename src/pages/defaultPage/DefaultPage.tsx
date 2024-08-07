import { Box, CircularProgress, Sheet, Typography } from '@mui/joy';
import { useRouterState } from '@tanstack/react-router';
import { MFApi } from '@api/api';
import { useEffect, useState } from 'react';
import { defaultPageStyles } from './defaultPage.styles';
import { SectionsContainer } from '@components/sections/SectionsContainer';
import { DefaultPageDto } from '@models/page/default-page-dto.model';
import { ContentBlocks } from '@components/contentBlocks/ContentBlocks';

export const DefaultPage = () => {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const [page, setPage] = useState<DefaultPageDto | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setPage(undefined);
    setIsLoading(true);
    MFApi.getPage(currentPath)
      .then((response) => {
        setPage(response.data);
        console.log('Page', response.data);
      })
      .catch((e) => {
        console.log('ERROR', e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPath]);

  return (
    <Box sx={defaultPageStyles}>
      {page?.id ? (
        <>
          {page?.template?.name !== 'home' && (
            <Sheet variant="soft" className="page-content">
              <Typography level="h1">{page.title}</Typography>
              {!!page.contents && <ContentBlocks blocks={page.contents}></ContentBlocks>}
            </Sheet>
          )}

          {!!page?.sections?.length && <SectionsContainer sections={page.sections} />}
        </>
      ) : (
        <>
          {!isLoading && (
            <Sheet variant="soft" className="page-content message">
              Keine Daten
            </Sheet>
          )}
        </>
      )}

      {isLoading && (
        <Sheet variant="soft" className="page-content message">
          <CircularProgress />
          Wird geladen...
        </Sheet>
      )}
    </Box>
  );
};
