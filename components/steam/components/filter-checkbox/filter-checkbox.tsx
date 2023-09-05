import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";

import styles from "./filter-checkbox.module.scss";
import {InventoryItemType} from "../../types";

type Props = {
  label: InventoryItemType;
  filters: InventoryItemType[];
  setFilter: Dispatch<SetStateAction<InventoryItemType[]>>;
};

export const FilterCheckbox: FC<Props> = ({label, filters, setFilter}) => {
  const [checked, setChecked] = useState(false);
  console.log(label);

  useEffect(() => {
    if (!checked) {
      const newFilters = filters.filter((el) => el != label);
      setFilter(newFilters);
    } else {
      const newFilters = [...filters, label];
      setFilter(newFilters);
    }
  }, [checked]);

  const handleChanges = (e: any) => {
    setChecked(!checked);
  };

  return (
    <label className={styles.filters} htmlFor={label}>
      <input
        id={label}
        type="checkbox"
        checked={checked}
        onChange={handleChanges}
      />
      <span>{label}</span>
    </label>
  );
};
