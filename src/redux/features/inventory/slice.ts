import {InventoryItemType} from '@/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {InventoryState} from '../../types';
import {INVENTORY_KEY} from '../../constants';

const initialState: InventoryState = {
  items: [],
  isLoading: false,
  error: null
};

const inventory = createSlice({
  name: INVENTORY_KEY,
  initialState,
  reducers: {
    getItemsStart: (state: InventoryState, _action) => {
      state.isLoading = true;
    },
    getItemsSuccess: (state: InventoryState, action: PayloadAction<InventoryItemType[]>) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    getItemsError: (state: InventoryState, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getInitialItemsStart: (state: InventoryState) => {
      state.isLoading = true;
    },
    getInitialItemsSuccess: (state: InventoryState, action: PayloadAction<InventoryItemType[]>) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    getInitialItemsError: (state: InventoryState, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getItemsStart,
  getItemsSuccess,
  getItemsError,
  getInitialItemsStart,
  getInitialItemsSuccess,
  getInitialItemsError
} = inventory.actions;

export const inventoryReducer = inventory.reducer;
