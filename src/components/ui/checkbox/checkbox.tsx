import {FC} from 'react';
import classNames from 'classnames';

import styles from './checkbox.module.scss';

type Props = {
  name: string;
  label: string;
  checked?: boolean;
  readOnly?: boolean;
  onClick?: () => void;
  isWithoutBorder?: boolean;
  defaultChecked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export const Checkbox: FC<Props> = ({
  name,
  label,
  checked,
  onClick,
  onChange,
  readOnly,
  defaultChecked,
  isWithoutBorder = false
}) => (
  <label
    className={classNames(styles.label, {
      [styles.checked]: (checked || defaultChecked) && !isWithoutBorder
    })}
    htmlFor={name}
  >
    <input
      id={name}
      type="checkbox"
      onClick={onClick}
      checked={checked}
      readOnly={readOnly}
      onChange={onChange}
      className={styles.input}
      defaultChecked={defaultChecked}
    />
    <span>{label}</span>
  </label>
);
