export const trimWords = (
  text: string,
  characterLimit: number,
  endString?: string
): string => {
  if (text.length <= characterLimit) {
    return text;
  }

  if (typeof endString !== "string") {
    endString = "…";
  }

  const combinedCharacterLimit = characterLimit + endString.length;

  const trimmedText = text.slice(0, combinedCharacterLimit);
  if (text.charAt(combinedCharacterLimit + 1) === " ") {
    return trimmedText + endString;
  }

  const lastSpaceIndex = trimmedText.lastIndexOf(" ");

  if (lastSpaceIndex === -1) {
    return trimmedText + endString;
  }

  return trimmedText.slice(0, lastSpaceIndex) + endString;
};
