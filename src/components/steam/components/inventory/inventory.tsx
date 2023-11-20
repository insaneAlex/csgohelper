import {paginate, getScreenSize, calculateInventoryPrice} from '../../helpers';
import {ResponsiveInventoryList} from '../responsive-inventory-list';
import {InventoryItemType} from '@/src/services/steam-inventory';
import {itemsUpdateTimeSelector} from '@/src/redux';
import {Pagination} from '@/src/components/ui';
import {useState, FC, useMemo} from 'react';
import {useWindowWidth} from '@/src/hooks';
import {useSelector} from 'react-redux';
import {MAX_ITEMS} from './constants';

import styles from './inventory.module.scss';

export const gridConfig = {
  col: {lg: 16, md: 12, sm: 20, xs: 12, xxs: 6},
  width: {lg: 2, md: 2, sm: 4, xs: 3, xxs: 3},
  height: {lg: 1.5, md: 1.5, sm: 1.5, xs: 1.5, xxs: 2}
};

export const Inventory: FC<{items: InventoryItemType[]}> = ({items}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const updateTime = useSelector(itemsUpdateTimeSelector);
  const itemsAmount = items.length;

  const screenSize = getScreenSize({width: useWindowWidth()});
  const itemsPerRow = gridConfig.col[screenSize] / gridConfig.width[screenSize];

  const pageSize = itemsPerRow * Math.floor(MAX_ITEMS / itemsPerRow);
  const pagesCount = Math.ceil(itemsAmount / pageSize);
  const emptyTiles = pagesCount * pageSize - itemsAmount;
  const totalPrice = calculateInventoryPrice({items});

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

  return (
    <>
      <p className={styles.info}>{`Items:${itemsAmount}${totalPrice ? ` | value ${totalPrice}` : ''}`}</p>

      {updateTime && <p className={styles.updateTime}>{`inventory cached, last update - ${updateTime}`}</p>}
      <ResponsiveInventoryList gridConfig={gridConfig} items={paginatedInventory} />

      <section className={styles.pages}>
        <Pagination
          pagesCount={pagesCount}
          currentPage={currentPage}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </section>
    </>
  );
};
