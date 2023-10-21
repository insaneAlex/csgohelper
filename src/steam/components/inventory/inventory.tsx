import {paginate, getScreenSize, calculateInventoryPrice} from '../../helpers';
import {ResponsiveInventoryList} from '../responsive-inventory-list';
import {itemsUpdateTimeSelector} from '@/src/redux';
import {useState, FC, useMemo} from 'react';
import {useWindowWidth} from '@/src/hooks';
import {InventoryItemType} from '@/types';
import {GridConfigType} from '../types';
import {useSelector} from 'react-redux';
import {Page} from '../page';

import styles from './inventory.module.scss';

export const Inventory: FC<{items: InventoryItemType[]}> = ({items}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const updateTime = useSelector(itemsUpdateTimeSelector);
  const itemsLength = items.length;

  const gridConfig: GridConfigType = {
    col: {lg: 16, md: 12, sm: 20, xs: 20, xxs: 16},
    width: {lg: 2, md: 2, sm: 4, xs: 4, xxs: 4},
    height: {lg: 1.5, md: 1.5, sm: 1.5, xs: 1, xxs: 1}
  };

  const screenSize = getScreenSize({width: useWindowWidth()});
  const pageSize = (gridConfig.col[screenSize] / gridConfig.width[screenSize]) * 5;
  const pagesCount = Math.ceil(itemsLength / pageSize);
  const emptyTiles = pagesCount * pageSize - itemsLength;
  const totalPrice = calculateInventoryPrice({items});

  if (currentPage > pagesCount) {
    setCurrentPage(pagesCount);
  }

  const missingTiles = useMemo(
    () => Array.from({length: emptyTiles}, (_, index) => ({assetid: String(index)})),
    [emptyTiles]
  );

  const paginatedInventory = useMemo(
    () => paginate({items: [...items, ...missingTiles], pageNumber: currentPage, pageSize}),
    [pageSize, currentPage, items, missingTiles]
  );

  return (
    <>
      <section className={styles.gridHeader}>
        <h2 className={styles.title}>{`Items:${itemsLength}`}</h2>
        {totalPrice && <span>{` | value: ${totalPrice}$`}</span>}
      </section>

      {updateTime && <p className={styles.updateTime}>{`inventory cached, last update - ${updateTime}`}</p>}
      <ResponsiveInventoryList gridConfig={gridConfig} items={paginatedInventory} />

      <section className={styles.pages}>
        <Page pagesCount={pagesCount} currentPage={currentPage} onPageChange={(page: any) => setCurrentPage(page)} />
      </section>
    </>
  );
};
