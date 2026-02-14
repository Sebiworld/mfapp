import { isValidObject } from "./isValidObject";

export const isError = (data: unknown): data is Error => {
  if (!isValidObject(data)) {
    return false;
  }

  const TypedModernError = Error as unknown as {
    isError?: (data: unknown) => boolean;
  };
  if (typeof TypedModernError.isError === "function") {
    return TypedModernError.isError(data);
  } else {
    return data instanceof Error;
  }

  return false;
};
