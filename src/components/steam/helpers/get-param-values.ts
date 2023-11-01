import {NextRouter} from 'next/router';

export const getParamValue = (router: NextRouter, name: string) => {
  const paramValues = router.query[name];
  if (typeof paramValues === 'string') {
    return [paramValues];
  } else if (Array.isArray(paramValues)) {
    return paramValues;
  } else return [];
};
