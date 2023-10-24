import {FC} from 'react';
import styles from './overlay.module.scss';

export const Overlay: FC<{onClick?: () => void}> = ({onClick}) => (
  <div onClick={onClick} className={styles.overlay}></div>
);
