import {areEqualArrays, getParamValuesArray, removeParamValue} from '../../../helpers';
import {isFilterApplied} from './is-filter-applied';
import {ParsedUrlQuery} from 'querystring';
import {StrArrObject} from '@/types';

type calculateFilterValueType = (a: string, b: string, c: ParsedUrlQuery, d: StrArrObject) => StrArrObject;

export const calculateFilterValue: calculateFilterValueType = (filterName, value, query, possibleFilters) => {
  const currentValues = getParamValuesArray(query, filterName);
  const filterIsApplied = isFilterApplied(currentValues, value);
  const typeParamValues = getParamValuesArray(query, 'type');

  let newFilterValue: StrArrObject = {};

  if (!filterIsApplied && typeParamValues.includes(filterName)) {
    const remainingSubfilters = possibleFilters[filterName].filter((el) => el !== value);
    newFilterValue = {type: removeParamValue(typeParamValues, filterName), [filterName]: remainingSubfilters};
  } else {
    newFilterValue = filterIsApplied
      ? {[filterName]: removeParamValue(currentValues, value)}
      : filterName === 'type'
      ? {[filterName]: [...currentValues, value], [value]: []}
      : {[filterName]: [...currentValues, value]};
  }
  if (areEqualArrays(newFilterValue[filterName], possibleFilters[filterName])) {
    if (!newFilterValue.type) {
      newFilterValue.type = removeParamValue(typeParamValues, filterName);
    }
    newFilterValue[filterName] = [];
    newFilterValue.type.push(filterName);
  }

  return newFilterValue;
};
