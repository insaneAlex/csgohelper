import {InventoryErrorType, InventoryState} from '../../types';
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {INVENTORY_KEY} from '../../constants';
import {InventoryItemType} from '@/src/services/steam-inventory';
import {GetInventoryPayloadType, InventoryStatuses} from './types';

const initialState: InventoryState = {
  items: [],
  error: null,
  status: InventoryStatuses.IDLE,
  update_time: null
};

const inventory = createSlice({
  name: INVENTORY_KEY,
  initialState,
  reducers: {
    getItemsStart: (state: InventoryState, action: PayloadAction<GetInventoryPayloadType>) => {
      state.status = action.payload.force ? InventoryStatuses.FORCE_LOAD : InventoryStatuses.INIT_LOAD;
      state.error = null;
    },
    getItemsSuccess: (
      state: InventoryState,
      action: PayloadAction<{inventory: InventoryItemType[]; update_time?: string}>
    ) => {
      state.status = InventoryStatuses.IDLE;
      state.update_time = action.payload.update_time;
      state.items = action.payload.inventory;
    },
    getItemsError: (state: InventoryState, action: PayloadAction<InventoryErrorType>) => {
      state.status = InventoryStatuses.IDLE;
      state.error = action.payload;
    }
  }
});

export const {getItemsStart, getItemsError, getItemsSuccess} = inventory.actions;

export const inventoryReducer = inventory.reducer;
