import {DUPLICATES_PARAM, MAX_ITEMS, SORT, SORT_OPTIONS, GRID_CONFIG} from './constants';
import {paginate, getScreenSize, calculateInventoryPrice} from '../../helpers';
import {ResponsiveInventoryList} from '../responsive-inventory-list';
import {InventoryItemType} from '@/src/services/steam-inventory';
import {Pagination, ToggleButton} from '@/src/components/ui';
import {addRouterQueryParam} from '@/src/services/helpers';
import {SteamProfileTile} from '../steam-profile-tile';
import {itemsUpdateTimeSelector} from '@/src/redux';
import {useState, FC, useMemo} from 'react';
import {useWindowWidth} from '@/src/hooks';
import {SortDropdown} from './components';
import {useSelector} from 'react-redux';
import {NextRouter} from 'next/router';

import styles from './inventory.module.scss';

export const Inventory: FC<{items: InventoryItemType[]; router: NextRouter}> = ({items, router}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const updateTime = useSelector(itemsUpdateTimeSelector);
  const screenSize = getScreenSize({width: useWindowWidth()});
  const itemsPerRow = GRID_CONFIG.cols[screenSize] / GRID_CONFIG.width[screenSize];
  const pageSize = itemsPerRow * Math.floor(MAX_ITEMS / itemsPerRow);
  const itemsAmount = items.length;
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

  const isChecked = router.query?.[DUPLICATES_PARAM] === 'false';
  const selectedValue = router.query[SORT] as string;

  return (
    <>
      <section className={styles.info}>
        <SteamProfileTile itemsAmount={itemsAmount} totalPrice={totalPrice} />

        <div>
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
        </div>
      </section>

      {updateTime && <p className={styles.updateTime}>inventory cached, last update - {updateTime}</p>}
      <ResponsiveInventoryList gridConfig={GRID_CONFIG} items={paginatedInventory} router={router} />

      <Pagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </>
  );
};
