import {ChangeEvent, FC} from 'react';
import {SortTypes} from '../../constants';

import styles from './sort-dropdown.module.scss';

type Props = {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: {name: string; value: SortTypes}[];
  selectedValue: string;
};

export const SortDropdown: FC<Props> = ({onChange, options, selectedValue}) => (
  <span className={styles.container}>
    <label htmlFor="sort">sort by</label>
    <select className={styles.select} name="languages" id="sort" onChange={onChange} value={selectedValue}>
      {options.map(({name, value}) => (
        <option key={value} className={styles.option} value={value}>
          {name}
        </option>
      ))}
    </select>
  </span>
);
