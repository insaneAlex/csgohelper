import {Dispatch, FC, SetStateAction} from "react";

import styles from "./inventory-filters.module.scss";
import {InventoryItemType} from "../../types";

type Props = {setFilter: Dispatch<SetStateAction<InventoryItemType>>};

export const InventoryFilters: FC<Props> = ({setFilter}) => {
  const handleChange = (e: any) => {
    setFilter(e.target.value);
  };

  return (
    <div className={styles.filters}>
      <div>Filters</div>
      <div>
        Type:
        <select onChange={handleChange}>
          <option value="">no filter</option>;
          {Object.keys(InventoryItemType).map((key, i) => {
            /* @ts-ignore */
            const value = InventoryItemType[key];
            return (
              <option key={i} value={value}>
                {value}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};
