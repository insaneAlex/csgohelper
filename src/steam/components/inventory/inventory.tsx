import {useState, FC} from 'react';
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

  const gridConfig: GridConfigType = {
    col: {lg: 16, md: 12, sm: 20, xs: 20, xxs: 16},
    width: {lg: 2, md: 2, sm: 4, xs: 4, xxs: 4},
    height: {lg: 1.5, md: 1.5, sm: 1.5, xs: 1, xxs: 1}
  };

  const screenSize = getScreenSize({width: useWindowWidth()});
  const pageSize = (gridConfig.col[screenSize] / gridConfig.width[screenSize]) * 5;
  const paginatedInventory = paginate({items, pageNumber: currentPage, pageSize});

  const onPageChange = (page: any) => setCurrentPage(page);
  const pagesCount = Math.ceil(items.length / pageSize);
  return (
    <>
      <h2 className={styles.title}>{`Items: ${items.length}`}</h2>
      <ResponsiveInventoryList gridConfig={gridConfig} items={paginatedInventory} />
      <div className={styles.pages}>
        <Page pagesCount={pagesCount} currentPage={currentPage} onPageChange={onPageChange} />
      </div>
    </>
  );
};
