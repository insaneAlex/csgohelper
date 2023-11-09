export type InitialInventoryResponseType = {inventory: string; update_time: string};

export type InventoryResponseType = {
  savedOnDB: boolean;
  update_time?: string;
  status: number;
  inventory: string;
};

export type FeedbackType = {text: string; name: string};
