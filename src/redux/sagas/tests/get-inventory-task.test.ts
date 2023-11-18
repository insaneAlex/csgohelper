import {getInventoryTask} from '../get-inventory-task';
import {getItemsError, getItemsSuccess} from '../..';
import {InventoryStatuses} from '../../features';
import {expectSaga} from 'redux-saga-test-plan';

const fetchInventoryMock = jest.fn();

jest.mock('../../../services', () => ({}));
jest.mock('../../../../core', () => ({
  fetchInventory: () => fetchInventoryMock()
}));

describe('postFeedbackTask', () => {
  const fetchInventoryPayload = {steamid: '123', isForceUpdate: true};
  it('should dispatch postFeedbackSuccess on successful postFeedback', async () => {
    const expectedResponse = {inventory: '[]', update_time: 'asdad'};
    fetchInventoryMock.mockResolvedValueOnce(expectedResponse);
    return await expectSaga(getInventoryTask, {
      payload: fetchInventoryPayload,
      type: ''
    })
      .provide([[fetchInventoryMock, {status: 'ok'}]])
      .put(getItemsSuccess({...expectedResponse, inventory: JSON.parse(expectedResponse.inventory)}))
      .run();
  });
  it('should dispatch postFeedbackSuccess on successful postFeedback', async () => {
    fetchInventoryMock.mockRejectedValueOnce({});
    return await expectSaga(getInventoryTask, {
      payload: fetchInventoryPayload,
      type: ''
    })
      .provide([[fetchInventoryMock, {}]])
      .put(getItemsError(undefined as unknown as InventoryStatuses))
      .run();
  });
});
