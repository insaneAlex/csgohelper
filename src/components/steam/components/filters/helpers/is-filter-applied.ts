export const isFilterApplied = (filters: string | string[] | undefined, filter: string) => {
  if (Array.isArray(filters)) {
    return filters.includes(filter);
  } else if (typeof filters === 'string') {
    return filters === filter;
  }
  return false;
};
