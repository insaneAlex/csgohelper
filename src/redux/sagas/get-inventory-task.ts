import {PayloadAction} from '@reduxjs/toolkit';
import {call, put} from 'redux-saga/effects';
import {getItemsError, getItemsSuccess} from '../features';
import {InventoryResponseType, STEAMID_PARAM, fetchInventory} from '@/core';
import {SteamIDType} from '../types';
import {storage} from '@/src/services';
import {SteamFetchErrors} from './constants';

export function* getInventoryTask({
  payload
}: PayloadAction<SteamIDType>): Generator<unknown, void, InventoryResponseType> {
  const {signal} = new AbortController();
  const {steamid} = payload;

  try {
    const {inventory: inventoryJson, statusCode, error, update_time} = yield call(fetchInventory, {steamid, signal});
    const inventory = JSON.parse(inventoryJson);
    inventory?.length > 0 && storage.localStorage.set(STEAMID_PARAM, steamid);

    if (statusCode === 403) {
      yield put(getItemsError(SteamFetchErrors.PRIVATE_INVENTORY_ERROR));
    } else if (statusCode === 404) {
      yield put(getItemsError(SteamFetchErrors.PROFILE_NOT_FOUND));
    } else if (error?.steamAccountFetchError === SteamFetchErrors.TOO_MANY_REQUESTS) {
      yield put(getItemsError(SteamFetchErrors.TOO_MANY_REQUESTS));
    } else {
      yield put(getItemsSuccess({inventory, update_time}));
    }
  } catch (e) {
    yield put(getItemsError(e));
  }
}
