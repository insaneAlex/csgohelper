import {FilterCheckbox} from '../filter-checkbox';
import {useSearchParams} from 'next/navigation';
import {FILTERS_PARAM} from '../../constants';
import {ItemTypes} from '@/types';
import Link from 'next/link';
import {FC} from 'react';

import styles from './inventory-filters.module.scss';

export const InventoryFilters: FC = () => {
  const searchParams = useSearchParams();
  const filters = searchParams.get(FILTERS_PARAM);
  const filtersArray = filters?.split('_');

  const handleSetFilter = (type: string) => {
    if (!filters) {
      return `?${FILTERS_PARAM}=${type}`;
    } else if (filters === type) {
      return ``;
    } else if (filtersArray?.some((el) => el === type)) {
      const newA = filtersArray?.filter((el) => el !== type);
      return `?${FILTERS_PARAM}=${newA?.join('_')}`;
    }
    return `?${FILTERS_PARAM}=${filters}_${type}`;
  };

  return (
    <section className={styles.filters}>
      {ItemTypes.map((type) => {
        const href = handleSetFilter(type);
        return (
          <Link href={href} key={type}>
            <FilterCheckbox label={type} name={type} />
          </Link>
        );
      })}
    </section>
  );
};
