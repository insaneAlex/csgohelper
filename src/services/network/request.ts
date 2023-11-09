import {FetchOptions, RequestBody} from './types';

export const bareRequest = (url: string, options = {}) =>
  window
    .fetch(url, options)
    .then((response) => {
      if (response.status === 404 || response.status === 403) {
        throw {status: response.status};
      }
      return Promise.all([response.json(), response.status]);
    })
    .then(([json, status]) => ({...json, status}));

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
