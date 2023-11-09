import {bareRequest} from './network';
import {FetchOptions, RequestBody} from './types';

const get = <T>(url: string, options: FetchOptions = {}): Promise<T> => {
  const getOptions = {
    headers: {'Content-Type': 'application/json'},
    ...options
  };

  return bareRequest(url, getOptions);
};

const post = <T>(url: string, body: RequestBody, options?: FetchOptions): Promise<T> => {
  const postOptions = {
    ...options,
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  };
  return bareRequest(url, postOptions);
};

export const fetch = {get, post};
