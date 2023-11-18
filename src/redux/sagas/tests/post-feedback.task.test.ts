import {postFeedbackError, postFeedbackSuccess} from '../../features/feedback';
import {postFeedbackTask} from '../post-feedback-task';
import {expectSaga} from 'redux-saga-test-plan';

const postFeedbackMock = jest.fn();

jest.mock('../../../../core', () => ({
  postFeedback: () => postFeedbackMock()
}));

const feedbackData = {text: 'text', name: 'name'};
describe('postFeedbackTask', () => {
  it('should dispatch postFeedbackSuccess on successful postFeedback', async () => {
    postFeedbackMock.mockResolvedValueOnce({status: 200});
    return await expectSaga(postFeedbackTask, {
      payload: feedbackData,
      type: ''
    })
      .provide([[postFeedbackMock, {status: 'ok'}]])
      .put(postFeedbackSuccess())
      .run();
  });
  it('should dispatch postFeedbackSuccess on successful postFeedback', async () => {
    postFeedbackMock.mockRejectedValueOnce({});
    return await expectSaga(postFeedbackTask, {
      payload: feedbackData,
      type: ''
    })
      .provide([[postFeedbackMock, {status: 'ok'}]])
      .put(postFeedbackError())
      .run();
  });
});
