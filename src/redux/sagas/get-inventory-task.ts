import {InventoryResponseType, STEAMID_PARAM, fetchInventory} from '@/core';
import {InventoryStatuses, getItemsError, getItemsSuccess} from '../features';
import {InventoryErrorType, SteamIDType} from '../types';
import type {PayloadAction} from '@reduxjs/toolkit';
import {call, put, type PutEffect, type CallEffect} from 'redux-saga/effects';
import {storage} from '@/src/services';

export type InventoryPayloadType = PayloadAction<SteamIDType & {force?: boolean}>;
type ReturnType = Generator<CallEffect | PutEffect, void, InventoryResponseType>;

export function* getInventoryTask({payload: {steamid, force = false}}: InventoryPayloadType): ReturnType {
  const {signal} = new AbortController();

  try {
    const {inventory: inventoryStr, savedOnDB, update_time} = yield call(fetchInventory, {steamid, force, signal});
    const inventory = JSON.parse(inventoryStr);
    inventory?.length > 0 && savedOnDB && storage.localStorage.set(STEAMID_PARAM, steamid);
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
