import classNames from 'classnames';
import {useRouter} from 'next/router';
import React, {FC, useState} from 'react';
import styles from './filter-item.module.scss';
import {Variants, motion} from 'framer-motion';
import {Checkbox, Icons, Separator} from '@/src/components/ui';
import {isFilterApplied} from '../../helpers';

type Props = {
  onFilterUpdate: (arg: {subFilter?: string; filter: string}) => void;
  subFilters: string[];
  isChecked: boolean;
  filter: string;
};

export const FilterItem: FC<Props> = ({filter, isChecked, subFilters, onFilterUpdate}) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const subFiltersLenght = subFilters.length;
  const hasSubfilters = subFiltersLenght > 1;
  const appliedSubfilters = router.query[filter];

  const listVariants = {
    open: {
      clipPath: 'inset(0% 0% 0% 0% round 0px)',
      transition: {type: 'spring', bounce: 0, duration: 0.2, delayChildren: 0.1, staggerChildren: 0.05}
    },
    closed: {
      clipPath: 'inset(10% 50% 90% 50% round 10px)',
      transition: {type: 'spring', bounce: 0, duration: 0.3}
    }
  };

  const itemVariants: Variants = {
    open: {opacity: 1, y: 0, transition: {type: 'spring', stiffness: 300, damping: 24}},
    closed: {opacity: 0, y: 20, transition: {duration: 0.2}}
  };

  const hasAppliedSubfilter = subFilters?.some((filter) => isFilterApplied(appliedSubfilters, filter));
  return (
    <motion.nav
      initial={false}
      onMouseLeave={() => setOpen(false)}
      animate={open ? 'open' : 'closed'}
      className={classNames(styles.wrapper, {[styles.topBordered]: hasAppliedSubfilter || isChecked})}
    >
      <motion.button whileTap={{scale: 0.97}} className={styles.button} onMouseEnter={() => setOpen(true)}>
        <Checkbox
          readOnly
          name={filter}
          label={filter}
          isWithoutBorder
          checked={isChecked}
          onChange={() => onFilterUpdate({filter})}
        />
        <motion.div
          transition={{duration: 0.1}}
          className={styles.iconWrapper}
          style={{originY: 0.55, originX: 0.55}}
          variants={{open: {rotate: -90}, closed: {rotate: 0}}}
        >
          {hasSubfilters && <Icons.BackSmall />}
        </motion.div>
      </motion.button>
      {hasSubfilters && (
        <motion.div className={styles.listWrapper}>
          <motion.ul className={classNames(styles.list, {[styles.listActive]: open})} variants={listVariants}>
            {subFilters.sort().map((filterKey, i) => (
              <motion.li key={filterKey} variants={itemVariants}>
                <Checkbox
                  isWithoutBorder
                  name={filterKey}
                  label={filterKey}
                  onChange={() => onFilterUpdate({subFilter: filterKey, filter})}
                  checked={isFilterApplied(appliedSubfilters, filterKey) || isFilterApplied(router.query.type, filter)}
                />
                {!(i === subFiltersLenght - 1) && <Separator noMargin />}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      )}
    </motion.nav>
  );
};
