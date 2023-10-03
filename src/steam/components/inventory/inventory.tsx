import {useState, FC, useMemo} from 'react';
import {InventoryItemType} from '@/types';
import {paginate, getScreenSize} from '../../helpers';
import {Page} from '../page';
import {ResponsiveInventoryList} from '../responsive-inventory-list';
import {GridConfigType} from '../types';
import {useWindowWidth} from '@/src/hooks';

import styles from './inventory.module.scss';

type Props = {items: InventoryItemType[]};

export const Inventory: FC<Props> = ({items}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsLength = items.length;

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

  const missingTiles = useMemo(() => {
    let newArray = [];
    for (let index = 0; index < emptyTiles; index++) {
      newArray.push({assetid: String(index)});
    }
    return newArray;
  }, [emptyTiles]);

  const paginatedInventory = useMemo(
    () => paginate({items: [...items, ...missingTiles], pageNumber: currentPage, pageSize}),
    [pageSize, currentPage, items, missingTiles]
  );

  return (
    <>
      <h2 className={styles.title}>{`Items: ${itemsLength}`}</h2>
      <ResponsiveInventoryList gridConfig={gridConfig} items={paginatedInventory} />
      <section className={styles.pages}>
        <Page pagesCount={pagesCount} currentPage={currentPage} onPageChange={(page: any) => setCurrentPage(page)} />
      </section>
    </>
  );
};
