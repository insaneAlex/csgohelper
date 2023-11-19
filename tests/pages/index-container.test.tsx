import React from 'react';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux';
import {SteamInventoryContainer} from '@/pages';
import {inventoryReducer} from '@/src/redux';
import {configureStore} from '@reduxjs/toolkit';
import {INVENTORY_KEY} from '@/src/redux/constants';
import {createStubComponent} from '@/mocks/redux';

jest.mock('../../src/services', () => ({}));

describe('SteamInventoryContainer', () => {
  const mockStore = configureStore({reducer: {[INVENTORY_KEY]: inventoryReducer}});
  it('should successfully pass props', () => {
    const StubComponent = createStubComponent();
    const WrapedComponent = SteamInventoryContainer(StubComponent);

    const {container} = render(
      <Provider store={mockStore}>
        <WrapedComponent />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
