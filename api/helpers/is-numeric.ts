export const isNumeric = (str: string) => {
  if (typeof str !== 'string') return false;
  return !Number.isNaN(str) && !Number.isNaN(parseFloat(str));
};
