export type InitialInventoryResponseType = {inventory: string; update_time: string};

export type InventoryResponseType = {
  isSavedOnDynamo: boolean;
  update_time?: string;
  statusCode: number;
  inventory: string;
};

export type FeedbackType = {text: string; name: string};
