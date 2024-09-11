import { Page } from '@pages/page/Page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$')({
  component: Page,
});
