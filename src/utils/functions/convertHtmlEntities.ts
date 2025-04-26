/**
 * Converts HTML entities in a string to their corresponding characters.
 *
 * This function creates a temporary `<textarea>` element, sets its `innerHTML`
 * to the provided string, and then retrieves the decoded value from the
 * `value` property of the `<textarea>`. This is useful for decoding HTML
 * entities such as `&amp;`, `&lt;`, `&gt;`, etc., into their respective
 * characters.
 *
 * @param str - The string containing HTML entities to be converted.
 * @returns The decoded string with HTML entities replaced by their corresponding characters.
 */
export const convertHtmlEntities = (str: string): string => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = str;
  return textarea.value;
};
