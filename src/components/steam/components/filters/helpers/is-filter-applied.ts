export const isFilterApplied = (filters: string | string[] | undefined, filter: string) =>
  Array.isArray(filters) ? filters.includes(filter) : filters === filter;
