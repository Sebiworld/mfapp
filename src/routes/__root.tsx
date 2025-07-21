import { createRootRoute } from "@tanstack/react-router";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { App } from "@src/App";

const rootSearchParamsSchema = z.object({
  registration_confirm: z.optional(z.string()),
  // season: z.optional(z.number()),
}).catchall(z.unknown());

export const Route = createRootRoute({
  component: App,
  validateSearch: zodValidator(rootSearchParamsSchema),
});
