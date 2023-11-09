import {bareRequest} from './network';
import {FetchOptions, RequestBody} from './types';

const get = <T>(url: string, options: FetchOptions = {}): Promise<T> => bareRequest(url, options);

const post = <T>(url: string, body: RequestBody, options?: FetchOptions): Promise<T> => {
  const postOptions = {
    ...options,
    method: 'POST',
    body: JSON.stringify(body)
  };
  return bareRequest(url, postOptions);
};

export const fetch = {get, post};
