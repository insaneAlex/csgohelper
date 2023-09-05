import {Dispatch, FC, SetStateAction, useState} from "react";

import styles from "./inventory-filters.module.scss";
import {InventoryItemType} from "../../types";

type Props = {setFilter: Dispatch<SetStateAction<InventoryItemType>>};

export const InventoryFilters: FC<Props> = ({setFilter}) => {
  const handleChange = (e: any) => {
    setFilter(e.target.value);
  };
  const [checked, setChecked] = useState(false);

  if (!checked) {
    setFilter(null as unknown as InventoryItemType);
  } else {
    setFilter(InventoryItemType.BaseGradeContainer);
  }

  const handleChanges = (e: any) => {
    console.log(e.target.value);

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
