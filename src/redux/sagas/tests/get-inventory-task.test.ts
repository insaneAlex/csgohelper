import {getInventoryTask} from '../get-inventory-task';
import {getItemsError, getItemsSuccess} from '../..';
import {InventoryStatuses} from '../../features';
import {expectSaga} from 'redux-saga-test-plan';
import {STEAMID_PARAM} from '@/core';

const fetchInventoryMock = jest.fn();
const setLocalStorageMock = jest.fn();
jest.mock('@/core', () => ({fetchInventory: () => fetchInventoryMock()}));
jest.mock('@/src/services', () => ({
  storage: {localStorage: {set: (a: string) => setLocalStorageMock(a), get: () => STEAMID_PARAM}}
}));

describe('getInventoryTask', () => {
  const fetchInventoryPayload = {steamid: {isSteamId64: true, value: '123'}, isForceUpdate: true};
  const profile = {avatarfull: '', personaname: '', profileurl: ''};
  it('should dispatch getItemsSuccess on successful fetchInventory', async () => {
    const expectedResponse = {inventory: '[]', update_time: 'asdad', profile};
    fetchInventoryMock.mockResolvedValueOnce(expectedResponse);
    return await expectSaga(getInventoryTask, {
      payload: fetchInventoryPayload,
      type: ''
    })
      .provide([[fetchInventoryMock, {}]])
      .put(getItemsSuccess({...expectedResponse, inventory: JSON.parse(expectedResponse.inventory)}))
      .run();
  });
  it('should dispatch getItemsError on failed fetchInventory', async () => {
    fetchInventoryMock.mockRejectedValueOnce({});
    return await expectSaga(getInventoryTask, {
      payload: fetchInventoryPayload,
      type: ''
    })
      .provide([[fetchInventoryMock, {}]])
      .put(getItemsError(undefined as unknown as InventoryStatuses))
      .run();
  });
  describe('when inventory was saved and inventory length more than 0', () => {
    it('should save steamid to local storage', async () => {
      const expectedResponse = {inventory: '[{}]', update_time: 'asdad', profile, shouldSaveSteamId: true};
      const {inventory, update_time} = expectedResponse;
      fetchInventoryMock.mockResolvedValueOnce(expectedResponse);
      await expectSaga(getInventoryTask, {
        payload: fetchInventoryPayload,
        type: ''
      })
        .provide([[fetchInventoryMock, {}]])
        .put(getItemsSuccess({inventory: JSON.parse(inventory), update_time, profile}))
        .run();
      expect(setLocalStorageMock).toHaveBeenCalledWith(STEAMID_PARAM);
    });
  });
});
