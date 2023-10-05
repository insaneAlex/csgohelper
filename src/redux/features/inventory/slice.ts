import {InventoryItemType} from '@/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {InventoryState} from '../../types';
import {INVENTORY_KEY} from '../../constants';

const initialState: InventoryState = {
  items: [],
  isLoading: false,
  hasError: false
};

const inventory = createSlice({
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
