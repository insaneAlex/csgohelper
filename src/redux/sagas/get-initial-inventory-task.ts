import {call, put} from 'redux-saga/effects';
import {getInitialItemsError, getInitialItemsSuccess} from '../features';
import {InitialInventoryResponseType, fetchInitialInventory} from '@/core';

export function* getInitialInventoryTask(): Generator<unknown, void, InitialInventoryResponseType> {
  const {signal} = new AbortController();

  try {
    const {inventory, update_time} = yield call(fetchInitialInventory, {signal});

    yield put(getInitialItemsSuccess({inventory: JSON.parse(inventory), update_time}));
  } catch (e) {
    yield put(getInitialItemsError(e));
  }
}
