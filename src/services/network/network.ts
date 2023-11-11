import {UrlParam} from './types';

export const createUrl = (url: string, params?: Record<string, UrlParam>): string => {
  if (!params) {
    return url;
  }

  const queryString = Object.entries(params)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value
          .filter((param) => param !== undefined && param !== null && param !== '')
          .map((param) => `${encodeURIComponent(key)}=${encodeURIComponent(String(param))}`)
          .join('&');
      }

      if (value !== undefined && value !== null && value !== '') {
        return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
      }

      return null;
    })
    .filter((query) => query !== null)
    .join('&');

  return queryString ? `${url}${url.includes('?') ? '&' : '?'}${queryString}` : url;
};

export const bareRequest = (url: string, options = {}) => {
  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return Promise.all([response.json(), response.status]);
    })
    .then(([json, status]) => ({...json, status}))
    .catch((e) => {
      throw e;
    });
};
