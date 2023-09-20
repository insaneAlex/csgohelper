import {FC} from "react";
import {getInitialInventory} from "@/api";
import {Loader} from "@/components/ui";
import {InventoryItemType} from "@/types";
import Link from "next/link";
import {ItemDetails} from "@/components/steam";

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
  const data = await getData();
  const {params} = context;
  const itemId = params.itemId;

  const item = data.find((item: InventoryItemType) => item.assetid === itemId);

  if (!item) {
    return {notFound: true};
  }
  return {props: {item}};
};

export async function getStaticPaths() {
  const data = await getData();

  const paths = data.map((item: InventoryItemType) => ({
    params: {itemId: item.assetid},
  }));

  return {paths, fallback: true};
}

export default ItemDetailsPage;
