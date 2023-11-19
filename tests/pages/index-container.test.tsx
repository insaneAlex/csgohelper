import React from 'react';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux';
import {SteamInventoryContainer} from '@/pages';
import {inventoryReducer} from '@/src/redux';
import {configureStore} from '@reduxjs/toolkit';
import {INVENTORY_KEY} from '@/src/redux/constants';

jest.mock('../../src/services', () => ({}));

describe('SteamInventoryContainer', () => {
  const mockStore = configureStore({reducer: {[INVENTORY_KEY]: inventoryReducer}});
  it('should successfully pass props', () => {
    // eslint-disable-next-line react/display-name
    const createStubComponent = () => (props: any) => {
      expect(Object.keys(props).sort()).toMatchSnapshot();
      return <div data-testid="stub"></div>;
    };
    const StubComponent = createStubComponent();
    const WrapedComponent = SteamInventoryContainer(StubComponent);

    render(
      <Provider store={mockStore}>
        <WrapedComponent />
      </Provider>
    );
  });
});
