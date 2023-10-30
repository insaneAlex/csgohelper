import {InventoryResponseType, STEAMID_PARAM, fetchInventory} from '@/core';
import {getItemsError, getItemsSuccess} from '../features';
import {InventoryErrorType, SteamIDType} from '../types';
import type {PayloadAction} from '@reduxjs/toolkit';
import {call, put, type PutEffect, type CallEffect} from 'redux-saga/effects';
import {SteamFetchErrors} from './constants';
import {storage} from '@/src/services';

export function* getInventoryTask({
  payload
}: PayloadAction<SteamIDType>): Generator<CallEffect | PutEffect, void, InventoryResponseType> {
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
    yield put(getItemsError(e as InventoryErrorType));
  }
}
