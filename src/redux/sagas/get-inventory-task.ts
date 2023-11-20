import {GetInventoryPayloadType, InventoryStatuses, getItemsError, getItemsSuccess} from '../features';
import {STEAMID_PARAM, fetchInventory} from '@/core';
import type {PayloadAction} from '@reduxjs/toolkit';
import {call, put} from 'redux-saga/effects';
import {storage} from '@/src/services';

export function* getInventoryTask({payload: {steamid, isForceUpdate}}: PayloadAction<GetInventoryPayloadType>) {
  const {signal} = new AbortController();

  try {
    const {
      inventory: inventoryStr,
      shouldSaveSteamId,
      update_time
    } = yield call(fetchInventory, {steamid, isForceUpdate, signal});
    const inventory = JSON.parse(inventoryStr);
    inventory?.length > 0 && shouldSaveSteamId && storage.localStorage.set(STEAMID_PARAM, steamid);
    yield put(getItemsSuccess({inventory, update_time}));
  } catch (e) {
    yield put(getItemsError((e as {message: InventoryStatuses})?.message));
  }
}
