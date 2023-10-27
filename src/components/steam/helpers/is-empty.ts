export const isEmpty = (value?: string | null) => {
  if (value === undefined || value === null) {
    return true;
  }
  if (typeof value === 'string') {
    return !value.trim();
  }
  return false;
};
