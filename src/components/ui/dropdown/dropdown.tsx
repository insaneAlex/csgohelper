import {ChangeEvent, FC} from 'react';

import styles from './dropdown.module.scss';

type Props = {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: {name: string; value: string}[];
  selected: string;
  name: string;
};

export const Dropdown: FC<Props> = ({onChange, options, selected, name}) => (
  <select className={styles.select} onChange={onChange} value={selected} id={name}>
    {options.map(({name, value}) => (
      <option key={value} className={styles.option} value={value}>
        {name}
      </option>
    ))}
  </select>
);
