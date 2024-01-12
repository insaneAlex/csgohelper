import {FC} from 'react';
import classNames from 'classnames';

import styles from './toggle-button.module.scss';

type Props = {label: string; checked?: boolean; onClick: () => void};

export const ToggleButton: FC<Props> = ({label, onClick, checked}) => (
  <button onClick={onClick} className={styles.toggle}>
    <label className={styles.switch}>
      <input name="toggle" readOnly className={styles.input} type="checkbox" checked={checked} />
      <span className={classNames(styles.slider, styles.round)} />
    </label>
    <span>{label}</span>
  </button>
);
