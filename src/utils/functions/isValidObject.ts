export const isValidObject = (data: unknown): data is object => !!data && typeof data === 'object';