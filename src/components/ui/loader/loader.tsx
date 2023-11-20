import styles from './loader.module.scss';
import {FC} from 'react';

export const Loader: FC = () => {
  return <div className={styles.loader} data-testid="loader"></div>;
};
