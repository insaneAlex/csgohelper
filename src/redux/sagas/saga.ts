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
  try {
    const {inventory} = yield call(fetchInitialInventory);
    yield put(getInitialItemsSuccess(inventory));
  } catch (e) {
    yield put(getInitialItemsError(e));
  }
}

function* getInventoryTask({payload}: PayloadAction<{steamid: string}>) {
  const {steamid} = payload;

  try {
    const {inventory} = steamid && (yield call(fetchInventory, {steamid}));
    yield put(getItemsSuccess(inventory));
  } catch (e) {
    yield put(getItemsError(e));
  }
}

export function* InventorySaga() {
  yield takeLatest(getInitialItemsStart, getInitialInventoryTask);
  yield takeLatest(getItemsStart, getInventoryTask);
}
