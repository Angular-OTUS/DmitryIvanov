export const errorToMsg: (error: unknown) => string = (error: unknown) => {
  if (typeof error === 'string') {
    return error;
  }

  if (typeof error === 'object' && error !== null) {
    if ('message' in error && typeof error.message === 'string') {
      return error.message;
    }
    if ('toString' in error && typeof error.toString === 'function') {
      return error.toString();
    }
  }

  return 'An unknown error occurred';
};
