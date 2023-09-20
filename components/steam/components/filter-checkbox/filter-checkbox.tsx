import React, {FC, useState} from "react";
import {ItemType} from "@/types";
import {Checkbox} from "../../../ui/checkbox";

type Props = {
  name: ItemType;
  label: string;
  filters: ItemType[];
  setFilter: (filters: ItemType[]) => void;
};

export const FilterCheckbox: FC<Props> = ({
  name,
  label,
  filters,
  setFilter,
}) => {
  const [checked, setChecked] = useState(filters.includes(name));

  const handleChange = () => {
    let newFilters;
    if (checked) {
      setChecked(false);
      newFilters = filters.filter((filter) => filter !== name);
    } else {
      setChecked(true);
      newFilters = [...filters, name];
    }
    setFilter(newFilters);
  };

  return (
    <Checkbox
      onChange={handleChange}
      checked={checked}
      name={name}
      label={label}
    />
  );
};
