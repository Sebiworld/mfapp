export const parseString = (value: unknown): string | undefined => {
  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number') {
    return value.toString();
  }

  if (typeof value === 'boolean') {
    return value.toString();
  }

  if (value === null || value === undefined) {
    return undefined;
  }

  if (typeof value === 'object') {
    try {
      return JSON.stringify(value);
    } catch (error) {
      console.error('Failed to stringify object:', error);
      return undefined;
    }
  }

  return undefined;
};
