import {FC} from "react";
import classNames from "classnames";

import styles from "./checkbox.module.scss";

type Props = {
  checked?: boolean;
  name: string;
  label: string;
  readOnly?: boolean;
  defaultChecked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export const Checkbox: FC<Props> = ({
  checked,
  name,
  readOnly,
  label,
  defaultChecked,
  onChange,
}) => (
  <label
    className={classNames(styles.label, {
      [styles.checked]: checked || defaultChecked,
    })}
    htmlFor={name}
  >
    <input
      id={name}
      type="checkbox"
      readOnly={readOnly}
      defaultChecked={defaultChecked}
      checked={checked}
      onChange={onChange}
    />
    <span>{label}</span>
  </label>
);
