import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import {INVENTORY_KEY} from '../../constants';

const inventorySelector = (state: RootState) => state[INVENTORY_KEY];

export const itemsSelector = createSelector(inventorySelector, ({items}) => items);
export const itemsLoadingSelector = createSelector(inventorySelector, ({isLoading}) => isLoading);
