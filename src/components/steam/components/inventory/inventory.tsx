import {DUPLICATES_PARAM, MAX_ITEMS, SORT, SORT_OPTIONS, GRID_CONFIG} from './constants';
import {ResponsiveInventoryList} from '../responsive-inventory-list';
import {InventoryItemType} from '@/src/services/steam-inventory';
import {Pagination, ToggleButton} from '@/src/components/ui';
import {addRouterQueryParam} from '@/src/services/helpers';
import {paginate, getScreenSize} from '../../helpers';
import {useState, FC} from 'react';
import {useWindowWidth} from '@/src/hooks';
import {SortDropdown} from './components';
import {NextRouter} from 'next/router';

import styles from './inventory.module.scss';

export const Inventory: FC<{items: InventoryItemType[]; router: NextRouter}> = ({items, router}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const screenSize = getScreenSize({width: useWindowWidth()});
  const itemsPerRow = GRID_CONFIG.cols[screenSize] / GRID_CONFIG.width[screenSize];
  const pageSize = itemsPerRow * Math.floor(MAX_ITEMS[screenSize] / itemsPerRow);
  const itemsAmount = items.length;
  const pagesCount = Math.ceil(itemsAmount / pageSize);
  const emptyTiles = pagesCount * pageSize - itemsAmount;

  if (currentPage > pagesCount) {
    setCurrentPage(pagesCount);
  }

  const missingTiles = Array.from(
    {length: emptyTiles},
    (_, i) => ({assetid: `empty${String(i)}`, isEmpty: true}) as InventoryItemType
  );
  const paginatedInventory = paginate({items: [...items, ...missingTiles], pageNumber: currentPage, pageSize});
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

      <ResponsiveInventoryList gridConfig={GRID_CONFIG} items={paginatedInventory} router={router} />

      <Pagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </>
  );
};
