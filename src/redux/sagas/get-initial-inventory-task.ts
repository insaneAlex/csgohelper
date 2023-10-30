import {call, put, type CallEffect, type PutEffect} from 'redux-saga/effects';
import {InitialInventoryResponseType, fetchInitialInventory} from '@/core';
import {getInitialItemsError, getInitialItemsSuccess} from '../features';
import {InventoryPayloadType} from './get-inventory-task';
import {InventoryErrorType} from '../types';

type ReturnType = Generator<CallEffect | PutEffect, void, InitialInventoryResponseType>;

export function* getInitialInventoryTask({payload}: InventoryPayloadType): ReturnType {
  const {signal} = new AbortController();

  try {
    const {inventory, update_time} = yield call(fetchInitialInventory, {steamid: payload.steamid, signal});

    yield put(getInitialItemsSuccess({inventory: JSON.parse(inventory), update_time}));
  } catch (e) {
    yield put(getInitialItemsError(e as InventoryErrorType));
  }
}
