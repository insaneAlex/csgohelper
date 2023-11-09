type InternalFetchOptions = {
  params?: Record<string | number, string | string[] | number | boolean | undefined>;
} & Omit<RequestInit, 'body' | 'credentials'>;

export type UrlParam = string | number | boolean | string[] | null | undefined;

export type FetchOptions = Omit<InternalFetchOptions, 'method'>;

export type RequestBody = Record<string | number, string | number | boolean | undefined | object | null>;
