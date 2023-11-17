import {ParsedUrlQuery} from 'querystring';
import {getParamValuesArray} from './get-param-values-array';
import {StrArrObject} from '@/types';

export const getAppliedFilterParams = (possibleFilters: StrArrObject, params: ParsedUrlQuery) => {
  const filters: StrArrObject = {};
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
