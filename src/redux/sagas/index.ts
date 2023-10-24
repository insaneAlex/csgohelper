import {takeLatest} from 'redux-saga/effects';
import {getInitialItemsStart, getItemsStart} from '../features';
import {getInitialInventoryTask} from './get-initial-inventory-task';
import {getInventoryTask} from './get-inventory-task';

export {SteamFetchErrors} from './constants';

export function* InventorySaga() {
  yield takeLatest(getInitialItemsStart, getInitialInventoryTask);
  yield takeLatest(getItemsStart, getInventoryTask);
}
