import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

import styles from "./inventory-filters.module.scss";
import { InventoryItemType } from "../../types";

type Props = { setFilter: Dispatch<SetStateAction<InventoryItemType>> };

export const InventoryFilters: FC<Props> = ({ filters, setFilter }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!checked) {
      setFilter(
        filters.filter((el) => el != InventoryItemType.BaseGradeContainer)
      );
    } else {
      setFilter([...filters, InventoryItemType.BaseGradeContainer]);
    }
  }, [checked]);

  const handleChanges = (e: any) => {
    setChecked(!checked);
  };
  //console.log(checked);

  return (
    <label className={styles.filters}>
      <input type="checkbox" checked={checked} onChange={handleChanges} />
      <span>{InventoryItemType.BaseGradeContainer}</span>
    </label>
  );
};

//<select onChange={handleChange}>
//<option value="">no filter</option>;
//{Object.keys(InventoryItemType).map((key, i) => {
//  /* @ts-ignore */
//  const value = InventoryItemType[key];
//  return (
//    <option key={i} value={value}>
//      {value}
//    </option>
//  );
//})}
//</select>
