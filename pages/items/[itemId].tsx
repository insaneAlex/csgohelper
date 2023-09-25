import {FC} from "react";
import {BackIcon, Loader} from "@/components/ui";
import {InventoryItemType} from "@/types";
import Link from "next/link";
import {ItemDetails} from "@/components/steam";
import {DUMMY_INVENTORY} from "@/dummy/data";
import {useRouter} from "next/router";

type Props = {inventory: InventoryItemType[]};

const ItemDetailsPage: FC<Props> = ({inventory = DUMMY_INVENTORY}) => {
  const router = useRouter();
  const itemId = router.query.itemId;

  const item = inventory?.find((item) => item?.assetid === itemId);

  if (!item) {
    return <Loader />;
  }
  return (
    <>
      <Link href="/">
        <BackIcon height={32} width={32} />
      </Link>

      <ItemDetails item={item as InventoryItemType} />
    </>
  );
};

export default ItemDetailsPage;
