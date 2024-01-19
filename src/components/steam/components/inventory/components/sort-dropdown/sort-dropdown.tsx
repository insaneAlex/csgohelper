import {SortTypes} from '../../constants';
import {ChangeEvent, FC} from 'react';

import styles from './sort-dropdown.module.scss';

type Props = {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: {name: string; value: SortTypes}[];
  selectedValue: string;
};

export const SortDropdown: FC<Props> = ({onChange, options, selectedValue = SortTypes.Relevance}) => (
  <select className={styles.select} onChange={onChange} value={selectedValue} id="sort">
    {options.map(({name, value}) => (
      <option key={value} className={styles.option} value={value}>
        {name}
      </option>
    ))}
  </select>
);
