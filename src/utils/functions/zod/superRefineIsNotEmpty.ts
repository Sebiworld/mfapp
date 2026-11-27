import { zod } from "@utils/i18n/i18n";
import isEmpty from "lodash/isEmpty";
import type { RefinementCtx } from "zod";

export const superRefineIsNotEmpty = (
  val: unknown,
  ctx: RefinementCtx
): typeof zod.NEVER | undefined => {
  if (isEmpty(val)) {
    ctx.addIssue({
      code: "custom",
      params: {
        i18n: { key: "is_empty" },
      },
      continue: false,
    });

    return zod.NEVER;
  }
};
