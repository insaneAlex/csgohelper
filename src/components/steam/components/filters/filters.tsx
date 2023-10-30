import {FC} from 'react';
import {useRouter} from 'next/router';
import {FilterItem} from './components';
import {useSelector} from 'react-redux';
import styles from './filters.module.scss';
import {itemsFiltersSelector} from '@/src/redux';
import {Checkbox, Icons} from '@/src/components/ui';

export const Filters: FC = () => {
  const router = useRouter();
  const possibleFilters = useSelector(itemsFiltersSelector);

  const handleFilterUpdate = (filterName: string, value: string) => {
    const currentValue = router.query?.[filterName];

    if (Array.isArray(currentValue)) {
      if (currentValue.includes(value)) {
        return router.replace({query: {...router.query, [filterName]: currentValue.filter((v) => v !== value)}});
      } else {
        return router.replace({query: {...router.query, [filterName]: [...currentValue, value]}});
      }
    } else if (typeof currentValue === 'string') {
      const newValue = currentValue === value ? [] : [currentValue, value];
      return router.replace({query: {...router.query, [filterName]: newValue}});
    } else {
      return router.replace({query: {...router.query, [filterName]: [value]}});
    }
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
  const getIsChecked = (str: string | string[] | undefined, val: string) => {
    return typeof str === 'string' ? str === val : str?.includes(val);
  };

  return (
    <section className={styles.filters}>
      {typefilters.map((filter) => {
        const isChecked = getIsChecked(router.query?.type, filter) ?? false;
        return (
          <FilterItem
            key={filter}
            label={filter}
            isChecked={isChecked}
            renderIcon={() => <Icons.BackSmall />}
            onFilterUpdate={handleUpdateFilter}
            subFilters={possibleFilters[filter]}
            title={<Checkbox readOnly name={filter} label={filter} isWithoutBorder checked={isChecked} />}
          />
        );
      })}
    </section>
  );
};
