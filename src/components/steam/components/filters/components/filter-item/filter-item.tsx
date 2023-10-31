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
  label: string;
};

export const FilterItem: FC<Props> = ({label, isChecked, subFilters, onFilterUpdate}) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const subFiltersLenght = subFilters.length;
  const hasSubfilters = subFiltersLenght > 0;

  const handleOpenOptions = () => setOpen(true);
  const handleCloseOptions = () => setOpen(false);

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

  return (
    <motion.nav
      initial={false}
      onMouseLeave={handleCloseOptions}
      animate={open ? 'open' : 'closed'}
      className={classNames(styles.wrapper, {[styles.checked]: isChecked})}
    >
      <motion.button whileTap={{scale: 0.97}} className={styles.button} onMouseEnter={handleOpenOptions}>
        <Checkbox
          readOnly
          name={label}
          label={label}
          isWithoutBorder
          checked={isChecked}
          onChange={() => onFilterUpdate({filter: label})}
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
                  onChange={() => onFilterUpdate({subFilter: filterKey, filter: label})}
                  checked={isFilterApplied(router.query[label], filterKey) || isFilterApplied(router.query.type, label)}
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
