export const hexToRgb = (hex: unknown, removeContainer?: boolean) => {
  if (typeof hex !== "string") {
    return null;
  }

  let alpha = false;
  let h = hex.slice(hex.startsWith("#") ? 1 : 0);
  if (h.length === 3) {
    h = [...h].map((x) => x + x).join("");
  } else if (h.length === 8) {
    alpha = true;
  }

  const hNum = parseInt(h, 16);

  if (removeContainer) {
    return (
      (hNum >>> (alpha ? 24 : 16)) +
      "," +
      ((hNum & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
      "," +
      ((hNum & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
      (alpha ? `,${hNum & 0x000000ff}` : "")
    );
  }

  return (
    "rgb" +
    (alpha ? "a" : "") +
    "(" +
    (hNum >>> (alpha ? 24 : 16)) +
    "," +
    ((hNum & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
    "," +
    ((hNum & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
    (alpha ? `,${hNum & 0x000000ff}` : "") +
    ")"
  );
};
