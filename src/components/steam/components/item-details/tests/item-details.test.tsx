import {render} from '@testing-library/react';
import {ItemDetails} from '../item-details';
import {InventoryItemType} from '@/src/services/steam-inventory';

jest.mock('../../../../../services', () => ({}));

describe('ItemDetails', () => {
  const item = {icon_url: 'iconUrl', name: 'itemName', exterior: 'fine condition'} as InventoryItemType;
  it('should render correctly', () => {
    const {container} = render(<ItemDetails item={item} />);
    expect(container).toMatchSnapshot();
  });
});
