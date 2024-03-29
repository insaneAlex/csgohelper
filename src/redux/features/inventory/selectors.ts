import {createSelector} from '@reduxjs/toolkit';
import {INVENTORY_KEY} from '../../constants';
import {RootState} from '../../store';
import {StrArrObject} from '@/types';

const inventorySelector = (state: RootState) => state[INVENTORY_KEY];

export const itemsSelector = createSelector(inventorySelector, ({items}) => items);
export const itemsUpdateTimeSelector = createSelector(inventorySelector, ({update_time}) => update_time);
export const inventoryStatusSelector = createSelector(inventorySelector, ({status}) => status);
export const profileSelector = createSelector(inventorySelector, ({profile}) => profile);
export const itemsFiltersSelector = createSelector(inventorySelector, ({items}) =>
  items.reduce((accumutator, {type, weapon}) => {
    if (!weapon) {
      accumutator[type] = [];
    } else if (accumutator[type] && weapon) {
      !accumutator[type].includes(weapon) && accumutator[type].push(weapon);
    } else {
      accumutator[type] = [weapon];
    }
    return accumutator;
  }, {} as StrArrObject)
);
