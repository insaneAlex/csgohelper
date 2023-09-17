import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {ItemType} from "@/types";
import {Checkbox} from "../../../ui/checkbox";

type Props = {
  name: ItemType;
  label: string;
  filters: ItemType[];
  setFilter: Dispatch<SetStateAction<ItemType[]>>;
};

export const FilterCheckbox: FC<Props> = ({
  name,
  label,
  filters,
  setFilter,
}) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!checked) {
      setFilter(filters.filter((filter) => filter != name));
    } else {
      setFilter([...filters, name]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  const handleChanges = () => {
    setChecked(!checked);
  };

  return (
    <Checkbox
      onChange={handleChanges}
      checked={checked}
      name={name}
      label={label}
    />
  );
};
