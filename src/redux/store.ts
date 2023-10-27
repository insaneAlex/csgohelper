import {configureStore} from '@reduxjs/toolkit';
import {inventoryReducer} from './features';
import {INVENTORY_KEY} from './constants';
import createSagaMiddleware from 'redux-saga';
import {InventorySaga} from './sagas';

const rootReducer = {[INVENTORY_KEY]: inventoryReducer};

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()?.concat(sagaMiddleware)
});

sagaMiddleware.run(InventorySaga);

export type RootState = ReturnType<typeof store.getState>;
