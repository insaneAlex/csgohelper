import {calculateFilterValue} from './helpers/calculate-filter-value';
import {isFilterApplied} from './helpers';
import {FilterItem} from './components';
import {NextRouter} from 'next/router';
import {StrArrObject} from '@/types';
import {FC} from 'react';

import styles from './filters.module.scss';

type Props = {router: NextRouter; possibleFilters: StrArrObject};
type FiltersType = {subFilter?: string; filter: string};

export const Filters: FC<Props> = ({router, possibleFilters}) => {
  const {query} = router;

  const handleUpdateFilter = (filters: FiltersType) => {
    const {subFilter, filter} = filters;
    let newFilterValue;
    if (subFilter) {
      newFilterValue = calculateFilterValue(filter, subFilter, query, possibleFilters);
    } else {
      newFilterValue = calculateFilterValue('type', filter, query, possibleFilters);
    }
    router.push({query: {...query, ...newFilterValue}});
  };

  const typefilters = Object.keys(possibleFilters).sort();
  return (
    <section className={styles.filters}>
      {typefilters.map((filter) => (
        <FilterItem
          key={filter}
          router={router}
          filter={filter}
          onFilterUpdate={handleUpdateFilter}
          subFilters={possibleFilters[filter]}
          isChecked={isFilterApplied(query.type, filter)}
        />
      ))}
    </section>
  );
};
