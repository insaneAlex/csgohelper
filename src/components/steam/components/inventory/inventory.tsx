import {ResponsiveInventoryList} from '../responsive-inventory-list';
import {InventoryItemType} from '@/src/services/steam-inventory';
import {Pagination} from '@/src/components/ui';
import {FC, useMemo, useState} from 'react';
import {useRowGridItems} from '@/src/hooks';
import {NextRouter} from 'next/router';
import {paginate} from '../../helpers';

export const Inventory: FC<{items: InventoryItemType[]; router: NextRouter}> = ({items, router}) => {
  const [currentPage, setCurrentPage] = useState(1);

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

  return (
    <>
      <ResponsiveInventoryList items={paginatedInventory} router={router} />

      <Pagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </>
  );
};
