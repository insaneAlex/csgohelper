export const isEmpty = (value?: string | null) => (typeof value === 'string' ? !value.trim() : true);
