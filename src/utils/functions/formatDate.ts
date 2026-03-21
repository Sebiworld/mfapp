import { DateArg, format, FormatOptions } from "date-fns";
import { de } from "date-fns/locale";

export const formatDate = (
  date: DateArg<Date>,
  formatStr: string = "PPP",
  options: FormatOptions = {}
) => {
  if (!options.locale) {
    options.locale = de;
  }
  return format(date, formatStr, options);
};
