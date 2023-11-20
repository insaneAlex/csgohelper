import {feedbackStatusSelector} from '../selectors';
import {FEEDBACK_KEY} from '../../../constants';
import {FeedbackStatuses} from '../slice';
import {RootState} from '../../../store';

describe('Feedback Selectors', () => {
  it('should select feedback status', () => {
    const feedbackStatus = FeedbackStatuses.LOADING;
    const mockState = {[FEEDBACK_KEY]: {status: feedbackStatus}} as RootState;
    const result = feedbackStatusSelector(mockState);
    expect(result).toEqual(feedbackStatus);
  });
});
