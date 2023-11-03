import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import {INVENTORY_KEY} from '../../constants';

const inventorySelector = (state: RootState) => state[INVENTORY_KEY];

export const itemsSelector = createSelector(inventorySelector, ({items}) => items);
export const itemsLoadingSelector = createSelector(inventorySelector, ({isLoading}) => isLoading);
export const itemsUpdateTimeSelector = createSelector(inventorySelector, ({update_time}) => update_time);
export const itemsErrorSelector = createSelector(inventorySelector, ({error}) => error);
export const itemsFiltersSelector = createSelector(inventorySelector, ({items}) =>
  items.reduce(
    (accumutator, {type, weapon}) => {
      if (!weapon) {
        accumutator[type] = [];
      } else if (accumutator[type] && weapon) {
        !accumutator[type].includes(weapon) && accumutator[type].push(weapon);
      } else {
        accumutator[type] = [weapon];
      }
      return accumutator;
    },
    {} as Record<string, string[]>
  )
);
