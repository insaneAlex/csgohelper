import {Dispatch, FC, SetStateAction} from "react";

import {InventoryItemType} from "../../types";
import {FilterCheckbox} from "../filter-checkbox/filter-checkbox";

import styles from "./inventory-filters.module.scss";

type Props = {
  setFilter: Dispatch<SetStateAction<InventoryItemType[]>>;
  filters: InventoryItemType[];
};

export const InventoryFilters: FC<Props> = ({filters, setFilter}) => {
  return (
    <div className={styles.filters}>
      {Object.keys(InventoryItemType).map((el, i) => (
        <FilterCheckbox
          key={i}
          filters={filters}
          setFilter={setFilter}
          label={InventoryItemType[el]}
        />
      ))}
    </div>
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
