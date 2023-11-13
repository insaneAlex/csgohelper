import {InventoryStatuses} from '../..';
import {getItemsStart, getItemsSuccess, getItemsError, inventoryReducer} from '../slice';

describe('Inventory Slice', () => {
  it('should handle getItemsStart action with isForceUpdate true', () => {
    const initialState = {items: [], update_time: null, status: InventoryStatuses.IDLE};
    const newState = inventoryReducer(initialState, getItemsStart({isForceUpdate: true, steamid: 'qwe'}));

    expect(newState.status).toEqual(InventoryStatuses.FORCE_LOAD);
  });

  it('should handle getItemsStart action with isForceUpdate false', () => {
    const initialState = {items: [], update_time: null, status: InventoryStatuses.IDLE};
    const newState = inventoryReducer(initialState, getItemsStart({isForceUpdate: false, steamid: 'qwe'}));

    expect(newState.status).toEqual(InventoryStatuses.INIT_LOAD);
  });

  it('should handle getItemsSuccess action', () => {
    const initialState = {items: [], update_time: null, status: InventoryStatuses.INIT_LOAD};
    const mockPayload = {
      inventory: [
        {id: 1, name: 'Itm1'},
        {id: 2, name: 'Itm2'}
      ],
      update_time: '2023-01'
    };
    const newState = inventoryReducer(initialState, getItemsSuccess(mockPayload));
    const expected = {status: InventoryStatuses.IDLE, update_time: '2023-01', items: mockPayload.inventory};

    expect(newState).toEqual(expected);
  });

  it('should handle getItemsError action', () => {
    const initialState = {items: [], update_time: null, status: InventoryStatuses.INIT_LOAD};
    const newState = inventoryReducer(initialState, getItemsError(InventoryStatuses.NO_PROFILE));

    expect(newState.status).toEqual(InventoryStatuses.NO_PROFILE);
  });
});