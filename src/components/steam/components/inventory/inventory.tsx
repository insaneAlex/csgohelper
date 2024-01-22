import {DUPLICATES_PARAM, SORT, SORT_OPTIONS} from './constants';
import {ResponsiveInventoryList} from '../responsive-inventory-list';
import {InventoryItemType} from '@/src/services/steam-inventory';
import {addRouterQueryParam} from '@/src/services/helpers';
import {ToggleButton} from '@/src/components/ui';
import {SortDropdown} from './components';
import {NextRouter} from 'next/router';
import {FC} from 'react';

import styles from './inventory.module.scss';

export const Inventory: FC<{items: InventoryItemType[]; router: NextRouter}> = ({items, router}) => {
  const isChecked = router.query?.[DUPLICATES_PARAM] === 'false';
  const selectedValue = router.query[SORT] as string;

  return (
    <>
      <section className={styles.info}>
        <ToggleButton
          label="hide duplicates"
          onClick={() => addRouterQueryParam({router, param: {[DUPLICATES_PARAM]: isChecked}})}
          checked={isChecked}
        />

        <SortDropdown
          selectedValue={selectedValue}
          onChange={(e) => addRouterQueryParam({router, param: {[SORT]: e.target.value}})}
          options={SORT_OPTIONS}
        />
      </section>

      <ResponsiveInventoryList items={items} />
    </>
  );
};
