import {FC} from "react";
import classNames from "classnames";

import styles from "./checkbox.module.scss";

type Props = {
  checked: boolean;
  name: string;
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const Checkbox: FC<Props> = ({checked, name, label, onChange}) => (
  <label
    className={classNames(styles.label, {[styles.checked]: checked})}
    htmlFor={name}
  >
    <input id={name} type="checkbox" checked={checked} onChange={onChange} />
    <span>{label}</span>
  </label>
);
