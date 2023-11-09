import {postFeedbackStart} from '../features/feedback';
import {getInventoryTask} from './get-inventory-task';
import {postFeedbackTask} from './post-feedback-task';
import {takeLatest} from 'redux-saga/effects';
import {getItemsStart} from '../features';

export function* InventorySaga() {
  yield takeLatest(postFeedbackStart, postFeedbackTask);
  yield takeLatest(getItemsStart, getInventoryTask);
}
