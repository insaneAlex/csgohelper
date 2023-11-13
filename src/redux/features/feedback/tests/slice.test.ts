import {FeedbackType} from '@/core/types';
import {
  postFeedbackSuccess,
  postFeedbackStart,
  postFeedbackError,
  FeedbackStatuses,
  feedbackReducer,
  onResetState
} from '../slice';

describe('Feedback Slice', () => {
  it('should handle postFeedbackStart action', () => {
    const initialState = {status: FeedbackStatuses.IDLE};
    const newState = feedbackReducer(initialState, postFeedbackStart({} as FeedbackType));
    expect(newState.status).toEqual(FeedbackStatuses.LOADING);
  });

  it('should handle postFeedbackSuccess action', () => {
    const initialState = {status: FeedbackStatuses.IDLE};
    const newState = feedbackReducer(initialState, postFeedbackSuccess());
    expect(newState.status).toEqual(FeedbackStatuses.SUCCESS);
  });

  it('should handle postFeedbackError action', () => {
    const initialState = {status: FeedbackStatuses.IDLE};
    const newState = feedbackReducer(initialState, postFeedbackError());
    expect(newState.status).toEqual(FeedbackStatuses.ERROR);
  });

  it('should handle onResetState action', () => {
    const initialState = {status: FeedbackStatuses.SUCCESS};
    const newState = feedbackReducer(initialState, onResetState());
    expect(newState.status).toEqual(FeedbackStatuses.IDLE);
  });
});
