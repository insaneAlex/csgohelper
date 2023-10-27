import {paginate, getScreenSize, calculateInventoryPrice} from '../../helpers';
import {ResponsiveInventoryList} from '../responsive-inventory-list';
import {itemsUpdateTimeSelector} from '@/src/redux';
import {Pagination} from '@/src/components/ui';
import {useState, FC, useMemo} from 'react';
import {useWindowWidth} from '@/src/hooks';
import {InventoryItemType} from '@/types';
import {useSelector} from 'react-redux';

import styles from './inventory.module.scss';

export const Inventory: FC<{items: InventoryItemType[]}> = ({items}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const updateTime = useSelector(itemsUpdateTimeSelector);
  const itemsAmount = items.length;
  const MAX_ITEMS = 40;

  const gridConfig = {
    col: {lg: 16, md: 12, sm: 20, xs: 12, xxs: 6},
    width: {lg: 2, md: 2, sm: 4, xs: 3, xxs: 3},
    height: {lg: 1.5, md: 1.5, sm: 1.5, xs: 1.5, xxs: 2}
  };

  const screenSize = getScreenSize({width: useWindowWidth()});

  const width = gridConfig.width[screenSize];
  const cols = gridConfig.col[screenSize];

  const itemsPerRow = cols / width;
  const rowsConfig = {[screenSize]: Math.floor(MAX_ITEMS / itemsPerRow)};

  const pageSize = itemsPerRow * rowsConfig[screenSize];
  const pagesCount = Math.ceil(itemsAmount / pageSize);
  const emptyTiles = pagesCount * pageSize - itemsAmount;
  const totalPrice = calculateInventoryPrice({items});

  if (currentPage > pagesCount) {
    setCurrentPage(pagesCount);
  }

  const missingTiles = useMemo(
    () => Array.from({length: emptyTiles}, (_, i) => ({assetid: String(i), isEmpty: true}) as InventoryItemType),
    [emptyTiles]
  );

  const paginatedInventory = useMemo(
    () => paginate({items: [...items, ...missingTiles], pageNumber: currentPage, pageSize}),
    [pageSize, currentPage, items, missingTiles]
  );

  return (
    <>
      <section className={styles.gridHeader}>
        <h2 className={styles.title}>{`Items:${itemsAmount}`}</h2>
        {totalPrice && <span>{` | value: ${totalPrice}$`}</span>}
      </section>

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
