import {PRIVATE_INVENTORY_ERROR, PROFILE_NOT_FOUND, STEAMID_PARAM} from '@/api/constants';
import {InitialInvResType, InventoryResType} from '@/api/get-steam-inventory';
import {fetchInitialInventory, fetchInventory} from '@/api';
import {call, put, takeLatest} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {SteamIDType} from '@/api/types';
import {storage} from '@/src/services';
import {
  getInitialItemsSuccess,
  getInitialItemsStart,
  getInitialItemsError,
  getItemsSuccess,
  getItemsStart,
  getItemsError
} from '../features';

function* getInitialInventoryTask(): Generator<unknown, void, InitialInvResType> {
  const {signal} = new AbortController();

  try {
    const {inventory, update_time} = yield call(fetchInitialInventory, {signal});

    yield put(getInitialItemsSuccess({inventory: JSON.parse(inventory), update_time}));
  } catch (e) {
    yield put(getInitialItemsError(e));
  }
}

function* getInventoryTask({payload}: PayloadAction<SteamIDType>): Generator<unknown, void, InventoryResType> {
  const {signal} = new AbortController();
  const {steamid} = payload;

  try {
    const {inventory: inventoryJson, statusCode, update_time} = yield call(fetchInventory, {steamid, signal});
    const inventory = JSON.parse(inventoryJson);
    inventory?.length > 0 && storage.localStorage.set(STEAMID_PARAM, steamid);

    if (statusCode === 403) {
      yield put(getItemsError(PRIVATE_INVENTORY_ERROR));
    } else if (statusCode === 404) {
      yield put(getItemsError(PROFILE_NOT_FOUND));
    } else {
      yield put(getItemsSuccess({inventory, update_time}));
    }
  } catch (e) {
    yield put(getItemsError(e));
  }
}

export function* InventorySaga() {
  yield takeLatest(getInitialItemsStart, getInitialInventoryTask);
  yield takeLatest(getItemsStart, getInventoryTask);
}
