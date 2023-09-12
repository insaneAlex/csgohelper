import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import classNames from "classnames";
import {ItemType} from "@/data/dummy-inventory";

import styles from "./filter-checkbox.module.scss";

type Props = {
  label: ItemType;
  filters: ItemType[];
  setFilter: Dispatch<SetStateAction<ItemType[]>>;
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
