import {useState, FC, useMemo} from 'react';
import {InventoryItemType} from '@/types';
import {paginate, getScreenSize} from '../../helpers';
import {Page} from '../page';
import {ResponsiveInventoryList} from '../responsive-inventory-list';
import {GridConfigType} from '../types';
import {useWindowWidth} from '@/src/hooks';
import {useSelector} from 'react-redux';
import {itemsUpdateTimeSelector} from '@/src/redux';

import styles from './inventory.module.scss';

type Props = {items: InventoryItemType[]};

export const Inventory: FC<Props> = ({items}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsLength = items.length;
  const updateTime = useSelector(itemsUpdateTimeSelector);

  const gridConfig: GridConfigType = {
    col: {lg: 16, md: 12, sm: 20, xs: 20, xxs: 16},
    width: {lg: 2, md: 2, sm: 4, xs: 4, xxs: 4},
    height: {lg: 1.5, md: 1.5, sm: 1.5, xs: 1, xxs: 1}
  };

  const screenSize = getScreenSize({width: useWindowWidth()});
  const pageSize = (gridConfig.col[screenSize] / gridConfig.width[screenSize]) * 5;
  const pagesCount = Math.ceil(itemsLength / pageSize);

  if (currentPage > pagesCount) {
    setCurrentPage(pagesCount);
  }

  const emptyTiles = pagesCount * pageSize - itemsLength;

  const missingTiles = useMemo(
    () => Array.from({length: emptyTiles}, (_, index) => ({assetid: String(index)})),
    [emptyTiles]
  );

  const paginatedInventory = useMemo(
    () => paginate({items: [...items, ...missingTiles], pageNumber: currentPage, pageSize}),
    [pageSize, currentPage, items, missingTiles]
  );

  const TOTAL_VALUE = items
    .reduce((accumulator, currentValue) => {
      const price = Number(currentValue.prices?.['7_days']?.average);
      const count = currentValue?.count || 1;
      return isNaN(price) ? accumulator : accumulator + price * count;
    }, 0)
    .toFixed(2);

  return (
    <>
      <div className={styles.gridHeader}>
        <h2 className={styles.title}>{`Items:${itemsLength},`}</h2>
        <span>{`value: ${TOTAL_VALUE}$`}</span>
      </div>

      {updateTime && <p className={styles.updateTime}>{`inventory cached, last update - ${updateTime}`}</p>}
      <ResponsiveInventoryList gridConfig={gridConfig} items={paginatedInventory} />

      <section className={styles.pages}>
        <Page pagesCount={pagesCount} currentPage={currentPage} onPageChange={(page: any) => setCurrentPage(page)} />
      </section>
    </>
  );
};
