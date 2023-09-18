import {InventoryItemType, ItemType, TagsType} from "@/types";

type Props = {inventory: InventoryItemType[]; types: ItemType[]};

export const filterInventoryByTypes = ({inventory, types}: Props) =>
  inventory.filter((item) => {
    const tagName = item.tags.find(
      (item) => item[TagsType.CATEGORY] === "Type"
    )?.[TagsType.LOCALIZED_TAG_NAME];

    return types.includes(tagName as ItemType);
  });
