import {Dispatch, FC, SetStateAction} from "react";
import {FilterCheckbox} from "../filter-checkbox";
import {FORMATTED_TYPE_LABELS, ItemType} from "@/data/dummy-inventory";

import styles from "./inventory-filters.module.scss";

type Props = {
  setFilter: Dispatch<SetStateAction<ItemType[]>>;
  filters: ItemType[];
};

export const InventoryFilters: FC<Props> = ({filters, setFilter}) => {
  return (
    <div className={styles.filters}>
      {Object.keys(ItemType).map((type) => {
        let label = type; // @ts-ignore
        if (!FORMATTED_TYPE_LABELS.includes(ItemType[type])) {
          // @ts-ignore
          label = ItemType[type];
        }

        return (
          <FilterCheckbox
            key={type}
            filters={filters}
            setFilter={setFilter}
            label={label} // @ts-ignore
            name={ItemType[type]}
          />
        );
      })}
    </div>
  );
};
