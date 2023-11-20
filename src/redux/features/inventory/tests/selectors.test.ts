import {itemsUpdateTimeSelector, inventoryStatusSelector, itemsFiltersSelector} from '../selectors';
import {INVENTORY_KEY} from '../../../constants';
import {InventoryStatuses} from '../types';
import {RootState} from '../../../store';

describe('Inventory Selectors', () => {
  it('should select items update time from the inventory', () => {
    const update_time = '2023-01';
    const mockState = {[INVENTORY_KEY]: {update_time}} as RootState;
    const result = itemsUpdateTimeSelector(mockState);
    expect(result).toEqual(update_time);
  });
  it('should select inventory status', () => {
    const status = InventoryStatuses.INIT_LOAD;
    const mockState = {[INVENTORY_KEY]: {status}} as RootState;
    const result = inventoryStatusSelector(mockState);
    expect(result).toEqual(status);
  });
  it('should select itemsFilters', () => {
    const mockState = {
      [INVENTORY_KEY]: {
        items: [
          {type: 'Pistol', weapon: 'Fiv'},
          {type: 'Pistol', weapon: 'Zal'},
          {type: 'Riffle', weapon: 'm4a1'},
          {type: 'Container'}
        ],
        update_time: null,
        status: InventoryStatuses.IDLE
      }
    } as RootState;
    const expected = {Pistol: ['Fiv', 'Zal'], Riffle: ['m4a1'], 'Container': []};
    const result = itemsFiltersSelector(mockState);
    expect(result).toEqual(expected);
  });
});
