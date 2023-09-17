import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import classNames from "classnames";
import {ItemType} from "@/data/dummy-inventory";

import styles from "./filter-checkbox.module.scss";

type Props = {
  name: ItemType;
  label: string;
  filters: ItemType[];
  setFilter: Dispatch<SetStateAction<ItemType[]>>;
};

export const FilterCheckbox: FC<Props> = ({
  name,
  label,
  filters,
  setFilter,
}) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!checked) {
      setFilter(filters.filter((filter) => filter != name));
    } else {
      setFilter([...filters, name]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  const handleChanges = () => {
    setChecked(!checked);
  };

  return (
    <label
      className={classNames(styles.filter, {[styles.selected]: checked})}
      htmlFor={name}
    >
      <input
        id={name}
        type="checkbox"
        checked={checked}
        onChange={handleChanges}
      />
      <span>{label}</span>
    </label>
  );
};
