import { createRootRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import { App } from "@src/App";

const rootSearchParamsSchema = z.object({
  registration_confirm: z.optional(z.string()),
});

export const Route = createRootRoute({
  component: App,
  validateSearch: zodValidator(rootSearchParamsSchema),
});
