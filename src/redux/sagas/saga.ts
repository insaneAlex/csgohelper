import {fetchInitialInventory, fetchInventory} from '@/api';
import {call, put, takeLatest} from 'redux-saga/effects';
import {
  getItemsError,
  getItemsStart,
  getItemsSuccess,
  getInitialItemsError,
  getInitialItemsStart,
  getInitialItemsSuccess
} from '../features';
import {PayloadAction} from '@reduxjs/toolkit';
import {storage} from '@/src/services';
import {InitialInvResType, InventoryResType} from '@/api/get-steam-inventory';
import {STEAMID_PARAM} from '@/api/constants';

function* getInitialInventoryTask(): Generator<unknown, void, InitialInvResType> {
  const {signal} = new AbortController();

  try {
    const {inventory, update_time} = yield call(fetchInitialInventory, {signal});

    yield put(getInitialItemsSuccess({inventory: JSON.parse(inventory), update_time}));
  } catch (e) {
    yield put(getInitialItemsError(e));
  }
}

function* getInventoryTask({payload}: PayloadAction<{steamid: string}>): Generator<unknown, void, InventoryResType> {
  const {signal} = new AbortController();
  const {steamid} = payload;

  try {
    const {inventory, statusCode, update_time} = yield call(fetchInventory, {steamid, signal});
    statusCode === 200 && steamid && storage.localStorage.set(STEAMID_PARAM, steamid);

    yield put(getItemsSuccess({inventory: JSON.parse(inventory), update_time}));
  } catch (e) {
    yield put(getItemsError(e));
  }
}

export function* InventorySaga() {
  yield takeLatest(getInitialItemsStart, getInitialInventoryTask);
  yield takeLatest(getItemsStart, getInventoryTask);
}
