export const parseJson = (input: unknown, log = false): unknown | undefined => {
  if (!input || typeof input !== 'string') {
    return undefined;
  }

  try {
    return JSON.parse(input);
  } catch (error) {
    if (log) {
      console.error('Failed to parse JSON:', error);
    }
    return undefined;
  }
};
