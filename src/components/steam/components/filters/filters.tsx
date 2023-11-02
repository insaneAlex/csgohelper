import {FC} from 'react';
import {useRouter} from 'next/router';
import {FilterItem} from './components';
import {useSelector} from 'react-redux';
import {isFilterApplied} from './helpers';
import styles from './filters.module.scss';
import {itemsFiltersSelector} from '@/src/redux';
import {getParamValue} from '../../helpers';

export const Filters: FC = () => {
  const router = useRouter();
  const possibleFilters = useSelector(itemsFiltersSelector);

  const handleFilterUpdate = (filterName: string, value: string) => {
    const currentValue = getParamValue(router, filterName);
    const filterIsApplied = isFilterApplied(currentValue, value);

    let newFilterValue: Record<string, string[]> = {};

    if (!filterIsApplied && getParamValue(router, 'type').includes(filterName)) {
      newFilterValue = {['type']: getParamValue(router, 'type').filter((v) => v !== filterName)};
      newFilterValue[filterName] = [];
      possibleFilters[filterName].forEach((el) => {
        if (el !== value) {
          newFilterValue[filterName].push(el);
        }
      });
    } else {
      if (filterIsApplied) {
        newFilterValue = {[filterName]: currentValue.filter((v) => v !== value)};
      } else {
        newFilterValue =
          filterName === 'type'
            ? {[filterName]: [...currentValue, value], [value]: []}
            : {[filterName]: [...currentValue, value]};
      }
    }
    if (newFilterValue[filterName]?.length === possibleFilters[filterName]?.length) {
      if (!newFilterValue['type']) {
        newFilterValue['type'] = [];
      }

      newFilterValue[filterName] = [];
      newFilterValue['type'].push(filterName);
    }

    return router.push({query: {...router.query, ...newFilterValue}});
  };

  const handleUpdateFilter = (filters: {subFilter?: string; filter: string}) => {
    const {subFilter, filter} = filters;
    if (subFilter) {
      handleFilterUpdate(filter, subFilter);
    } else {
      handleFilterUpdate('type', filter);
    }
  };
  const typefilters = Object.keys(possibleFilters).sort();

  return (
    <section className={styles.filters}>
      {typefilters.map((filter) => (
        <FilterItem
          key={filter}
          label={filter}
          onFilterUpdate={handleUpdateFilter}
          subFilters={possibleFilters[filter]}
          isChecked={isFilterApplied(router.query.type, filter)}
        />
      ))}
    </section>
  );
};
