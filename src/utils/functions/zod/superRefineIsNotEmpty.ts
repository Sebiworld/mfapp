import { zod } from "@utils/i18n/i18n";
import isEmpty from "lodash/isEmpty";
import { SuperRefinement } from "zod";

export const superRefineIsNotEmpty: SuperRefinement<unknown> = (val, ctx) => {
  if (isEmpty(val)) {
    ctx.addIssue({
      code: zod.ZodIssueCode.custom,
      params: {
        i18n: { key: "is_empty" },
      },
      fatal: true,
    });

    return zod.NEVER;
  }
};
