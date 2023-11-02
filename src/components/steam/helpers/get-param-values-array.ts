import {ParsedUrlQuery} from 'querystring';

export const getParamValuesArray = (query: ParsedUrlQuery, name: string) => {
  const paramValues = query[name];
  if (typeof paramValues === 'string') {
    return [paramValues];
  } else if (Array.isArray(paramValues)) {
    return paramValues;
  } else return [];
};
