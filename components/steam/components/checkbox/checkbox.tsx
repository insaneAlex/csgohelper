import React, {FC} from "react";

import styles from "./checkbox.module.scss";

type Props = {label: string; checked: boolean; onChange: () => void};

export const Checkbox: FC<Props> = ({label, checked, onChange}) => {
  return (
    <label className={styles.filters} htmlFor="">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span>{label}</span>
    </label>
  );
};
