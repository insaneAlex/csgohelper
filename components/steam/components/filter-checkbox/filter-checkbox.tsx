import React, {FC} from "react";
import {ItemType} from "@/types";
import {Checkbox} from "../../../ui/checkbox";
import {useSearchParams} from "next/navigation";

type Props = {name: ItemType; label: string};

export const FilterCheckbox: FC<Props> = ({name, label}) => {
  const searchParams = useSearchParams();

  const filters = searchParams.get("filters");
  const filtersArray = filters?.split("_");
  const isChecked = filtersArray?.some((filter) => filter === label) ?? false;

  return <Checkbox checked={isChecked} readOnly name={name} label={label} />;
};
