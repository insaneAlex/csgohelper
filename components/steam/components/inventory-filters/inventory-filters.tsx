import {Dispatch, FC, SetStateAction} from "react";

import {InventoryItemType} from "../../types";
import {FilterCheckbox} from "../filter-checkbox";

import styles from "./inventory-filters.module.scss";

type Props = {
  setFilter: Dispatch<SetStateAction<InventoryItemType[]>>;
  filters: InventoryItemType[];
};

export const InventoryFilters: FC<Props> = ({filters, setFilter}) => {
  return (
    <div className={styles.filters}>
      {Object.keys(InventoryItemType).map((type) => (
        <FilterCheckbox
          key={type}
          filters={filters}
          setFilter={setFilter}
          // @ts-ignore
          label={InventoryItemType[type]}
        />
      ))}
    </div>
  );
};
