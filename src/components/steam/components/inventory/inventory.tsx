import {ResponsiveInventoryList} from '../responsive-inventory-list';
import {InventoryItemType} from '@/src/services/steam-inventory';
import {DUPLICATES_PARAM, SORT, SORT_OPTIONS} from './constants';
import {Pagination, ToggleButton} from '@/src/components/ui';
import {ChangeEvent, FC, useMemo, useState} from 'react';
import {addQueryParam} from '@/src/services/helpers';
import {useRowGridItems} from '@/src/hooks';
import {SortDropdown} from './components';
import {NextRouter} from 'next/router';
import {paginate} from '../../helpers';

import styles from './inventory.module.scss';

export const Inventory: FC<{items: InventoryItemType[]; router: NextRouter}> = ({items, router}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const isChecked = router.query?.[DUPLICATES_PARAM] === 'false';
  const selectedValue = router.query[SORT] as string;
  const {itemsPerRow, rowsAmount} = useRowGridItems();
  const pageSize = itemsPerRow * rowsAmount;
  const itemsAmount = items.length;
  const pagesCount = Math.ceil(itemsAmount / pageSize);
  const emptyTiles = pagesCount * pageSize - itemsAmount;

  if (currentPage > pagesCount) {
    setCurrentPage(pagesCount);
  }

  const missingTiles = useMemo(
    () =>
      Array.from({length: emptyTiles}, (_, i) => ({assetid: `empty${String(i)}`, isEmpty: true}) as InventoryItemType),
    [emptyTiles]
  );

  const paginatedInventory = useMemo(
    () => paginate({items: [...items, ...missingTiles], pageNumber: currentPage, pageSize}),
    [pageSize, currentPage, items, missingTiles]
  );

  const toggleDuplicates = () => addQueryParam({router, param: {[DUPLICATES_PARAM]: isChecked}});
  const sortInventory = (e: ChangeEvent<HTMLSelectElement>) => addQueryParam({router, param: {[SORT]: e.target.value}});
  return (
    <>
      <section className={styles.info}>
        <ToggleButton label="hide duplicates" onClick={toggleDuplicates} checked={isChecked} />

        <SortDropdown selectedValue={selectedValue} onChange={sortInventory} options={SORT_OPTIONS} />
      </section>

      <ResponsiveInventoryList items={paginatedInventory} router={router} />

      <Pagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </>
  );
};
