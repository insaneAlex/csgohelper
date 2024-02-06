import {postFeedbackError, postFeedbackSuccess} from '../../features/feedback';
import {postFeedbackTask} from '../post-feedback-task';
import {expectSaga} from 'redux-saga-test-plan';

const feedbackData = {text: 'text', name: 'name'};
const postFeedbackMock = jest.fn();
jest.mock('@/core', () => ({postFeedback: () => postFeedbackMock()}));

describe('postFeedbackTask', () => {
  it('should dispatch postFeedbackSuccess on successful postFeedback', async () => {
    postFeedbackMock.mockResolvedValueOnce({status: 200});
    return await expectSaga(postFeedbackTask, {
      payload: feedbackData,
      type: ''
    })
      .provide([[postFeedbackMock, {}]])
      .put(postFeedbackSuccess())
      .run();
  });
  it('should dispatch postFeedbackSuccess on successful postFeedback', async () => {
    postFeedbackMock.mockRejectedValueOnce({});
    return await expectSaga(postFeedbackTask, {
      payload: feedbackData,
      type: ''
    })
      .provide([[postFeedbackMock, {}]])
      .put(postFeedbackError())
      .run();
  });
});
