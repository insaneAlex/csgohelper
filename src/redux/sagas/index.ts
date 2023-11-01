import {getInitialInventoryTask} from './get-initial-inventory-task';
import {getInitialItemsStart, getItemsStart} from '../features';
import {postFeedbackStart} from '../features/feedback';
import {getInventoryTask} from './get-inventory-task';
import {postFeedbackTask} from './post-feedback-task';
import {takeLatest} from 'redux-saga/effects';
export {SteamFetchErrors} from './constants';

export function* InventorySaga() {
  yield takeLatest(getInitialItemsStart, getInitialInventoryTask);
  yield takeLatest(postFeedbackStart, postFeedbackTask);
  yield takeLatest(getItemsStart, getInventoryTask);
}
