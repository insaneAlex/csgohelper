import {configureStore} from '@reduxjs/toolkit';
import {inventoryReducer} from './features';
import {INVENTORY_KEY} from './constants';

const rootReducer = {[INVENTORY_KEY]: inventoryReducer};

export const store = configureStore({reducer: rootReducer});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;
