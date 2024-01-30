import {InventoryItemType} from '@/src/services';
import {motion} from 'framer-motion';
import {FC} from 'react';

import styles from './item-opened.module.scss';

type Props = {isOpened: boolean; item: InventoryItemType};

export const ItemOpened: FC<Props> = ({isOpened, item}) => {
  if (!isOpened) return null;
  const {exterior} = item;
  return (
    <>
      {exterior && (
        <motion.p animate={{opacity: 0.5}} className={styles.exterior}>
          {exterior}
        </motion.p>
      )}
    </>
  );
};
