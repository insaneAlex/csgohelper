import {InventoryResponseType, STEAMID_PARAM, fetchInventory} from '@/core';
import {getItemsError, getItemsSuccess} from '../features';
import {InventoryErrorType, SteamIDType} from '../types';
import type {PayloadAction} from '@reduxjs/toolkit';
import {call, put, type PutEffect, type CallEffect} from 'redux-saga/effects';
import {SteamFetchErrors} from './constants';
import {storage} from '@/src/services';

export type InventoryPayloadType = PayloadAction<SteamIDType>;
type ReturnType = Generator<CallEffect | PutEffect, void, InventoryResponseType>;

export function* getInventoryTask({payload: {steamid}}: InventoryPayloadType): ReturnType {
  const {signal} = new AbortController();

  try {
    const {inventory: inventoryStr, statusCode, savedOnDB, update_time} = yield call(fetchInventory, {steamid, signal});
    const inventory = JSON.parse(inventoryStr);
    inventory?.length > 0 && savedOnDB && storage.localStorage.set(STEAMID_PARAM, steamid);

    if (statusCode === 403) {
      yield put(getItemsError(SteamFetchErrors.PRIVATE_INVENTORY_ERROR));
    } else if (statusCode === 404) {
      yield put(getItemsError(SteamFetchErrors.PROFILE_NOT_FOUND));
    } else {
      yield put(getItemsSuccess({inventory, update_time}));
    }
  } catch (e) {
    yield put(getItemsError(e as InventoryErrorType));
  }
}
