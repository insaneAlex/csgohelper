export const isEmpty = (value?: string | null) => {
  if (value === undefined || value === null) {
    return true;
  }
  return typeof value === 'string' ? !value.trim() : false;
};
