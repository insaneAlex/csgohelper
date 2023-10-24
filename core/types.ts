type InventoryResponseErrorType = {steamAccountFetchError?: string; dynamoDBAccountFetchError?: string};

export type InitialInventoryResponseType = {inventory: string; update_time: string};

export type InventoryResponseType = {
  error?: InventoryResponseErrorType;
  update_time?: string;
  statusCode: number;
  inventory: string;
};
