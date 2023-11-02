import {ParsedUrlQuery} from 'querystring';
import {getParamValuesArray} from './get-param-values-array';

export const getAppliedFilterParams = (possibleFilters: {[key: string]: string[]}, params: ParsedUrlQuery) => {
  const filters: {[key: string]: string[]} = {};
  const parameters = {...params};

  const possibleFilterTypes = Object.keys(possibleFilters);

  const filterTypes: string[] = [];

  const typeParams = getParamValuesArray(parameters, 'type');
  typeParams.forEach((type) => possibleFilterTypes.includes(type) && filterTypes.push(type));

  if (filterTypes.length > 0) {
    filters.types = filterTypes;
  }

  parameters.type && delete parameters.type;

  Object.keys(parameters).forEach((param) => {
    if (param in possibleFilters) {
      filters[param] = [];
      const paramValues = getParamValuesArray(parameters, param);
      paramValues.forEach((val) => {
        if (possibleFilters[param].includes(val)) {
          filters[param].push(val);
        }
      });
    }
  });

  return filters;
};
