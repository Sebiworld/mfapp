import { ApiDefaultPage } from '@models/api-default-page.model';
import { Box, CircularProgress, Sheet, Typography } from '@mui/joy';
import { useRouterState } from '@tanstack/react-router';
import { api } from '@utils/api/api';
import { useEffect, useState } from 'react';

export const DefaultPage = () => {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const [page, setPage] = useState<ApiDefaultPage | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setPage(undefined);
    setIsLoading(true);
    api
      .getPage(currentPath)
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

  if (isLoading) {
    return (
      <Box sx={{ paddingTop: '64px' }}>
        <Sheet
          variant="soft"
          sx={{
            width: 300,
            mx: 'auto', // margin left & right
            my: 4, // margin top & bottom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
          }}
        >
          <CircularProgress />
          Wird geladen...
        </Sheet>
      </Box>
    );
  }

  if (!page?.id) {
    return (
      <Box sx={{ paddingTop: '64px' }}>
        <Sheet
          variant="soft"
          sx={{
            width: 300,
            mx: 'auto', // margin left & right
            my: 4, // margin top & bottom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
          }}
        >
          Keine Daten
        </Sheet>
      </Box>
    );
  }

  return (
    <Box sx={{ paddingTop: '64px' }}>
      <Sheet
        variant="soft"
        sx={{
          mx: 2, // margin left & right
          my: 4, // margin top & bottom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
      >
        <Typography level="h1">{page.title}</Typography>
      </Sheet>
    </Box>
  );
};
