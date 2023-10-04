import {InventoryItemType} from '@/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {INVENTORY_KEY} from '../constants';

type InventoryState = {
  items: InventoryItemType[];
  isLoading: boolean;
  hasError: boolean;
};
const initialState: InventoryState = {
  items: [],
  isLoading: false,
  hasError: false
};

export const inventory = createSlice({
  name: INVENTORY_KEY,
  initialState,
  reducers: {
    getItemsStart: (state: InventoryState) => {
      state.isLoading = true;
    },
    getItemsSuccess: (state: InventoryState, action: PayloadAction<InventoryItemType[]>) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    getItemsError: (state: InventoryState) => {
      state.isLoading = false;
      state.hasError = true;
    }
  }
});

export const {getItemsStart, getItemsSuccess, getItemsError} = inventory.actions;

export const inventoryReducer = inventory.reducer;
