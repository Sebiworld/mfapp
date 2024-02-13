import { DefaultPage } from '@pages/defaultPage/DefaultPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$')({
  component: DefaultPage,
});
