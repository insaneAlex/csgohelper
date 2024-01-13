import {GetInventoryPayloadType, InventoryStatuses} from './types';
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {InventoryItemType} from '@/src/services/steam-inventory';
import {SteamProfileType} from '@/core/types';
import {INVENTORY_KEY} from '../../constants';
import {InventoryState} from '../../types';

const initialState: InventoryState = {
  items: [],
  profile: null,
  update_time: null,
  status: InventoryStatuses.IDLE
};

const inventory = createSlice({
  name: INVENTORY_KEY,
  initialState,
  reducers: {
    getItemsStart: (state: InventoryState, action: PayloadAction<GetInventoryPayloadType>) => {
      state.status = action.payload.isForceUpdate ? InventoryStatuses.FORCE_LOAD : InventoryStatuses.INIT_LOAD;
    },
    getItemsSuccess: (
      state: InventoryState,
      action: PayloadAction<{inventory: InventoryItemType[]; update_time?: string; profile: SteamProfileType}>
    ) => {
      state.status = InventoryStatuses.IDLE;
      state.update_time = action.payload.update_time;
      state.items = action.payload.inventory;
      state.profile = action.payload.profile;
    },
    getItemsError: (state: InventoryState, action: PayloadAction<InventoryStatuses>) => {
      state.status = action.payload;
    }
  }
});

export const {getItemsStart, getItemsError, getItemsSuccess} = inventory.actions;

export const inventoryReducer = inventory.reducer;
