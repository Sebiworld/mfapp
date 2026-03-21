import { isValidObject } from "./isValidObject";

export const isValidArray = (data: unknown): data is Array<unknown> =>
  isValidObject(data) && Array.isArray(data);
