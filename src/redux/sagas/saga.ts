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

function* getInitialInventoryTask() {
  const abortController = new AbortController();

  try {
    const {inventory} = yield call(fetchInitialInventory, {signal: abortController.signal});
    yield put(getInitialItemsSuccess(inventory));
  } catch (e) {
    yield put(getInitialItemsError(e));
  }
}

function* getInventoryTask({payload}: PayloadAction<{steamid: string}>) {
  const abortController = new AbortController();
  const {steamid} = payload;

  try {
    const {inventory} = yield call(fetchInventory, {steamid, signal: abortController.signal});
    yield put(getItemsSuccess(inventory));
  } catch (e) {
    yield put(getItemsError(e));
  }
}

export function* InventorySaga() {
  yield takeLatest(getInitialItemsStart, getInitialInventoryTask);
  yield takeLatest(getItemsStart, getInventoryTask);
}
