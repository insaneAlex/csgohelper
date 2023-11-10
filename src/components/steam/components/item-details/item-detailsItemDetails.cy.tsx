import React from 'react';
import {ItemDetails} from './item-details';
import {InventoryItemType} from '@/src/services/steam-inventory';

describe('<ItemDetails />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ItemDetails item={{icon_url: 'test', name: 'M4A1', exterior: 'Factory new'} as InventoryItemType} />);
  });
});
