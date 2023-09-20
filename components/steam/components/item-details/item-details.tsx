import {InventoryItemType} from "@/types";
import {FC} from "react";

type Props = {item: InventoryItemType};

export const ItemDetails: FC<Props> = ({item}) => {
  return <h1>{item.name}</h1>;
};
