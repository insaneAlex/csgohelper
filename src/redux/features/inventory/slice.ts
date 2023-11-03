import {InventoryErrorType, InventoryState, SteamIDType} from '../../types';
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {INVENTORY_KEY} from '../../constants';
import {InventoryItemType} from '@/types';

const initialState: InventoryState = {
  items: [],
  error: null,
  isLoading: false,
  update_time: null
};

const inventory = createSlice({
  name: INVENTORY_KEY,
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getItemsStart: (state: InventoryState, _action: PayloadAction<SteamIDType>) => {
      state.isLoading = true;
      state.error = null;
    },
    getItemsSuccess: (
      state: InventoryState,
      action: PayloadAction<{inventory: InventoryItemType[]; update_time?: string}>
    ) => {
      state.isLoading = false;
      state.update_time = action.payload.update_time;
      state.items = action.payload.inventory;
    },
    getItemsError: (state: InventoryState, action: PayloadAction<InventoryErrorType>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getInitialItemsStart: (state: InventoryState, _action: PayloadAction<SteamIDType>) => {
      state.isLoading = true;
      state.error = null;
    },
    getInitialItemsSuccess: (
      state: InventoryState,
      action: PayloadAction<{inventory: InventoryItemType[]; update_time: string}>
    ) => {
      state.isLoading = false;
      state.update_time = action.payload.update_time;
      state.items = action.payload.inventory;
    },
    getInitialItemsError: (state: InventoryState, action: PayloadAction<InventoryErrorType>) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getItemsStart,
  getItemsError,
  getItemsSuccess,
  getInitialItemsStart,
  getInitialItemsError,
  getInitialItemsSuccess
} = inventory.actions;

export const inventoryReducer = inventory.reducer;
