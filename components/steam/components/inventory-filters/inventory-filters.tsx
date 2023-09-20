import {FC} from "react";
import {FilterCheckbox} from "../filter-checkbox";
import {ItemType, ItemTypes} from "@/types";

import styles from "./inventory-filters.module.scss";

type Props = {
  setFilter: (filters: ItemType[]) => void;
  filters: ItemType[];
};

export const InventoryFilters: FC<Props> = ({filters, setFilter}) => (
  <div className={styles.filters}>
    {ItemTypes.map((type) => (
      <FilterCheckbox
        key={type}
        filters={filters}
        setFilter={setFilter}
        label={type}
        name={type}
      />
    ))}
  </div>
);
