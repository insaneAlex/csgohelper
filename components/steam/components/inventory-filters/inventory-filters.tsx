import {Dispatch, FC, SetStateAction} from "react";
import {FilterCheckbox} from "../filter-checkbox";
import {ItemType} from "@/data/dummy-inventory";

import styles from "./inventory-filters.module.scss";

type Props = {
  setFilter: Dispatch<SetStateAction<ItemType[]>>;
  filters: ItemType[];
};

export const InventoryFilters: FC<Props> = ({filters, setFilter}) => {
  return (
    <div className={styles.filters}>
      {Object.keys(ItemType).map((type) => (
        <FilterCheckbox
          key={type}
          filters={filters}
          setFilter={setFilter}
          // @ts-ignore
          label={ItemType[type]}
        />
      ))}
    </div>
  );
};
