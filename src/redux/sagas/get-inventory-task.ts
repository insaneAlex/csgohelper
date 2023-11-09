import {GetInventoryPayloadType, InventoryStatuses, getItemsError, getItemsSuccess} from '../features';
import {STEAMID_PARAM, fetchInventory} from '@/core';
import type {PayloadAction} from '@reduxjs/toolkit';
import {call, put} from 'redux-saga/effects';
import {InventoryErrorType} from '../types';
import {storage} from '@/src/services';

export function* getInventoryTask({payload: {steamid, force = false}}: PayloadAction<GetInventoryPayloadType>) {
  const {signal} = new AbortController();

  try {
    const {
      inventory: inventoryStr,
      shouldSaveSteamId,
      update_time
    } = yield call(fetchInventory, {steamid, force, signal});
    const inventory = JSON.parse(inventoryStr);
    inventory?.length > 0 && shouldSaveSteamId && storage.localStorage.set(STEAMID_PARAM, steamid);
    yield put(getItemsSuccess({inventory, update_time}));
  } catch (e) {
    const errStatus = (e as {status: number})?.status;

    if (errStatus === 403) {
      yield put(getItemsError(InventoryStatuses.PRIVATE_INVENTORY));
    } else if (errStatus === 404) {
      yield put(getItemsError(InventoryStatuses.NO_PROFILE));
    } else {
      yield put(getItemsError(e as InventoryErrorType));
    }
  }
}
