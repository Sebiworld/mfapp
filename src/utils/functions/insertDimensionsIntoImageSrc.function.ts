
export const insertDimensionsIntoImageSrc = (src: string): string => {
  const srcParts = src.split('.');
  const extension = srcParts.pop();
  if (srcParts.length <= 1 || !extension) { return src; }
  srcParts.push('100x0', extension);
  return srcParts.join('.');
}