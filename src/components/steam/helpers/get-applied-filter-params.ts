import {ParsedUrlQuery} from 'querystring';
import {getParamValuesArray} from './get-param-values-array';

export const getAppliedFilterParams = (possibleFilters: {[key: string]: string[]}, params: ParsedUrlQuery) => {
  const filters: Record<string, string[]> = {};
  const parameters = {...params};

  const typeParams = getParamValuesArray(parameters, 'type');
  if (typeParams.length > 0) {
    const filterTypes = typeParams.filter((type) => possibleFilters[type]);
    if (filterTypes.length > 0) {
      filters.types = filterTypes;
    }
    delete parameters.type;
  }

  Object.keys(parameters).forEach((param) => {
    if (param in possibleFilters) {
      filters[param] = getParamValuesArray(parameters, param).filter((val) => possibleFilters[param].includes(val));
    }
  });

  return filters;
};
