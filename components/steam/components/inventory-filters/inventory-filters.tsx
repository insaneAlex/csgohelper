import {FC} from "react";

import styles from "./inventory-filters.module.scss";

type Props = {};

export const InventoryFilters: FC<Props> = () => {
  const handleChange = () => {};

  return (
    <div className={styles.filters}>
      <h3>Filters</h3>
      <div>
        Type:
        <select onChange={handleChange} name="" id="">
          <option value="pass">Pass</option>
          <option value="container">Container</option>
          <option value="graffiti">Graffiti</option>
          <option value="collectible">Collectible</option>
        </select>
      </div>
    </div>
  );
};
