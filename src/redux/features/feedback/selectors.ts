import {createSelector} from '@reduxjs/toolkit';
import {FEEDBACK_KEY} from '../../constants';
import {RootState} from '../../store';
import {FeedbackStatuses} from './slice';

const feedbackSelector = (state: RootState) => state[FEEDBACK_KEY];

export const feedbackStatusSelector = createSelector(feedbackSelector, ({status}) => status);
export const isFeedbackLoadingSelector = createSelector(
  feedbackSelector,
  ({status}) => status === FeedbackStatuses.LOADING
);
