import {FC} from 'react';
import {useRouter} from 'next/router';
import {FilterItem} from './components';
import {useSelector} from 'react-redux';
import {isFilterApplied} from './helpers';
import styles from './filters.module.scss';
import {itemsFiltersSelector} from '@/src/redux';

export const Filters: FC = () => {
  const router = useRouter();
  const possibleFilters = useSelector(itemsFiltersSelector);

  const handleFilterUpdate = (filterName: string, value: string) => {
    const currentValue = router.query[filterName];
    const isApplied = isFilterApplied(currentValue, value);

    let newFilterValue;
    if (Array.isArray(currentValue)) {
      newFilterValue = isApplied ? currentValue.filter((v) => v !== value) : [...currentValue, value];
    } else if (typeof currentValue === 'string') {
      newFilterValue = isApplied ? [] : [currentValue, value];
    } else {
      newFilterValue = [value];
    }
    return router.push({query: {...router.query, [filterName]: newFilterValue}});
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
