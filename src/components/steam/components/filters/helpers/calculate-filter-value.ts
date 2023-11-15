import {ParsedUrlQuery} from 'querystring';
import {areEqualArrays, getParamValuesArray, removeParamValue} from '../../../helpers';
import {isFilterApplied} from './is-filter-applied';

export const calculateFilterValue = (
  filterName: string,
  value: string,
  query: ParsedUrlQuery,
  possibleFilters: Record<string, string[]>
) => {
  const currentValues = getParamValuesArray(query, filterName);
  const filterIsApplied = isFilterApplied(currentValues, value);
  const typeParamValues = getParamValuesArray(query, 'type');

  let newFilterValue: Record<string, string[]> = {};

  if (!filterIsApplied && typeParamValues.includes(filterName)) {
    newFilterValue = {type: removeParamValue(typeParamValues, filterName), [filterName]: []};
    possibleFilters[filterName].forEach((el) => {
      if (el !== value) {
        newFilterValue[filterName].push(el);
      }
    });
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
