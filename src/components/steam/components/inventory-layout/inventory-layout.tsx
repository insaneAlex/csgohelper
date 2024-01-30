import {calculateInventoryPrice, getAppliedFilterParams, modifyInventory} from '../../helpers';
import {Inventory, DUPLICATES_PARAM, SORT, SORT_OPTIONS, SortTypes} from '../inventory';
import {inventoryStatusSelector, itemsFiltersSelector} from '@/src/redux';
import {Dropdown, Loader, ToggleButton} from '@/src/components/ui';
import {SteamProfileTile} from '../steam-profile-tile';
import {InventoryStatuses} from '@/src/redux/features';
import {addQueryParam} from '@/src/services/helpers';
import {InventoryItemType} from '@/src/services';
import {useSelector} from 'react-redux';
import {NextRouter} from 'next/router';
import {ChangeEvent, FC} from 'react';
import {Filters} from '../filters';

import styles from './inventory-layout.module.scss';

type Props = {items: InventoryItemType[]; router: NextRouter};

export const InventoryLayout: FC<Props> = ({items, router}) => {
  const status = useSelector(inventoryStatusSelector);
  const possibleFilters = useSelector(itemsFiltersSelector);

  const isLoading = status === InventoryStatuses.INIT_LOAD;
  const filters = getAppliedFilterParams(possibleFilters, router.query);
  const modifiedItems = modifyInventory({inventoryItems: items, filters, query: router.query});

  const renderInventory = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (items.length > 0) {
      return <Inventory items={modifiedItems} router={router} />;
    }
  };

  const isChecked = router.query?.[DUPLICATES_PARAM] === 'false';
  const selectedValue = router.query[SORT] as string;

  const toggleDuplicates = () => addQueryParam({router, param: {[DUPLICATES_PARAM]: isChecked}});
  const sortInventory = (e: ChangeEvent<HTMLSelectElement>) => addQueryParam({router, param: {[SORT]: e.target.value}});

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.sorting}>
          <SteamProfileTile
            itemsAmount={modifiedItems.length}
            totalPrice={calculateInventoryPrice({items: modifiedItems})}
          />
          <div className={styles.filters}>
            <Filters router={router} possibleFilters={possibleFilters} />
            <section className={styles.info}>
              <ToggleButton label="hide duplicates" onClick={toggleDuplicates} checked={isChecked} />
              <Dropdown
                name={SORT}
                onChange={sortInventory}
                options={SORT_OPTIONS}
                selected={selectedValue || SortTypes.Relevance}
              />
            </section>
          </div>
        </div>
        {renderInventory()}
      </div>
    </section>
  );
};
