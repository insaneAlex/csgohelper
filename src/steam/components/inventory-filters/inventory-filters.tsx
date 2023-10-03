import {FC} from "react";
import {FilterCheckbox} from "../filter-checkbox";
import {ItemTypes} from "@/types";
import {useSearchParams} from "next/navigation";
import Link from "next/link";

import styles from "./inventory-filters.module.scss";

export const InventoryFilters: FC = () => {
  const searchParams = useSearchParams();
  const filters = searchParams.get("filters");
  const filtersArray = filters?.split("_");

  const handleSetFilter = (type: string) => {
    if (!filters) {
      return `?filters=${type}`;
    } else if (filters === type) {
      return ``;
    } else if (filtersArray?.some((el) => el === type)) {
      const newA = filtersArray?.filter((el) => el !== type);
      return `?filters=${newA?.join("_")}`;
    }
    return `?filters=${filters}_${type}`;
  };

  return (
    <div className={styles.filters}>
      {ItemTypes.map((type) => {
        const href = handleSetFilter(type);
        return (
          <Link href={href} key={type}>
            <FilterCheckbox label={type} name={type} />
          </Link>
        );
      })}
    </div>
  );
};
