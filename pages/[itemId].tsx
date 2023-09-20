import {FC} from "react";
import {getInitialInventory} from "@/api";
import {Loader} from "@/components/ui";
import {InventoryItemType} from "@/types";
import Link from "next/link";
import {ItemDetails} from "@/components/steam";
import {DUMMY_INVENTORY} from "@/dummy/data";

type Props = {item: InventoryItemType};

const ItemDetailsPage: FC<Props> = (props) => {
  const {item} = props;

  if (!item) {
    return <Loader />;
  }
  return (
    <>
      <Link href="/">Back</Link>
      <ItemDetails item={item} />
    </>
  );
};

async function getData() {
  const {inventory} = await getInitialInventory();

  return inventory;
}

export const getStaticProps = async (context: any) => {
  // TODO: Remove after cloud inventory storage
  const data = (await getData()) || DUMMY_INVENTORY;
  const {params} = context;
  const itemId = params.itemId;

  const item = data.find((item: InventoryItemType) => item.assetid === itemId);

  if (!item) {
    return {notFound: true};
  }
  return {props: {item}};
};

export async function getStaticPaths() {
  // TODO: Remove after cloud inventory storage
  const data = (await getData()) || DUMMY_INVENTORY;

  const paths = data.map((item: InventoryItemType) => ({
    params: {itemId: item.assetid},
  }));

  return {paths, fallback: true};
}

export default ItemDetailsPage;
