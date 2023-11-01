import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {FEEDBACK_KEY} from '../../constants';

type FeedbackState = {status: FeedbackStatuses};

export enum FeedbackStatuses {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

const initialState: FeedbackState = {
  status: FeedbackStatuses.IDLE
};

const feedback = createSlice({
  name: FEEDBACK_KEY,
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    postFeedbackStart: (state: FeedbackState, _action: PayloadAction<{text: string; name: string}>) => {
      state.status = FeedbackStatuses.LOADING;
    },
    postFeedbackSuccess: (state: FeedbackState) => {
      state.status = FeedbackStatuses.SUCCESS;
    },
    postFeedbackError: (state: FeedbackState) => {
      state.status = FeedbackStatuses.ERROR;
    },
    onResetState: () => initialState
  }
});

export const {postFeedbackStart, postFeedbackSuccess, postFeedbackError, onResetState} = feedback.actions;

export const feedbackReducer = feedback.reducer;
