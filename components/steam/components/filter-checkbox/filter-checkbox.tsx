import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";

import styles from "./filter-checkbox.module.scss";
import {InventoryItemType} from "../../types";
import classNames from "classnames";

type Props = {
  label: InventoryItemType;
  filters: InventoryItemType[];
  setFilter: Dispatch<SetStateAction<InventoryItemType[]>>;
};

export const FilterCheckbox: FC<Props> = ({label, filters, setFilter}) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!checked) {
      setFilter(filters.filter((filter) => filter != label));
    } else {
      setFilter([...filters, label]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  const handleChanges = () => {
    setChecked(!checked);
  };

  return (
    <label
      className={classNames(styles.filter, {[styles.selected]: checked})}
      htmlFor={label}
    >
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
