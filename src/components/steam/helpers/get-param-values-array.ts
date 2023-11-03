import {ParsedUrlQuery} from 'querystring';

export const getParamValuesArray = (query: ParsedUrlQuery, name: string) => {
  const paramValues = query[name];

  if (paramValues === undefined) {
    return [];
  }
  return Array.isArray(paramValues) ? paramValues : [paramValues];
};
