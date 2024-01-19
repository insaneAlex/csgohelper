import {FC, ReactNode} from 'react';

import styles from './inventory-layout.module.scss';

export const InventoryLayout: FC<{children: ReactNode}> = ({children}) => {
  return <section className={styles.layout}>{children}</section>;
};
