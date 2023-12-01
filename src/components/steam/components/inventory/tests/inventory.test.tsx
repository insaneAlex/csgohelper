import {fireEvent, render, screen} from '@testing-library/react';
import {Inventory, gridConfig} from '../inventory';
import items from '../../../../../../mocks/items.json';
import {InventoryItemType} from '@/src/services';
import {NextRouter} from 'next/router';
import {DUPLICATES_PARAM} from '../constants';

const routerPushMock = jest.fn();
const dispatchMock = jest.fn();
jest.mock('../../../../../services', () => ({}));
jest.mock('../constants', () => ({MAX_ITEMS: 1}));
jest.mock('react-redux', () => ({useDispatch: () => dispatchMock, useSelector: jest.fn()}));
const routerMock = {push: (a: any) => routerPushMock(a), query: {}} as unknown as NextRouter;
describe('Inventory', () => {
  gridConfig.col['md'] = 1;
  gridConfig.width['md'] = 1;
  let inventoryItems = [...items, ...items] as unknown as InventoryItemType[];
  describe('when changing page', () => {
    afterAll(() => {
      jest.resetAllMocks();
    });
    it('should apply class to active buttonLink', () => {
      render(<Inventory items={inventoryItems} router={routerMock} />);
      const buttonPage2 = screen.getByText('2');
      fireEvent.click(buttonPage2);
      expect(buttonPage2).toHaveClass('linkActive');
    });
  });
  describe('when user is on last page and pages amout is reduced', () => {
    it('removed page should be replaced with last', () => {
      const {rerender} = render(<Inventory items={inventoryItems} router={routerMock} />);
      const buttonPageLast = screen.getByText(inventoryItems.length);
      fireEvent.click(buttonPageLast);
      expect(buttonPageLast).toHaveClass('linkActive');
      inventoryItems = items as unknown as InventoryItemType[];
      rerender(<Inventory items={inventoryItems} router={routerMock} />);
      const buttonPage2 = screen.getByText('2');
      expect(buttonPage2).toHaveClass('linkActive');
    });
  });
  describe('when user clicks on "hide duplicates" button', () => {
    describe('and no "duplicates" query exist', () => {
      it('should push "duplicates" query as fasle', () => {
        render(<Inventory items={inventoryItems} router={routerMock} />);
        fireEvent.click(screen.getByText('hide duplicates'));
        expect(routerPushMock).toHaveBeenCalledWith({query: {[DUPLICATES_PARAM]: false}});
      });
    });
    describe('and "duplicates" query exist', () => {
      it('should push "duplicates" query as true', () => {
        render(<Inventory items={inventoryItems} router={{...routerMock, query: {[DUPLICATES_PARAM]: 'false'}}} />);
        fireEvent.click(screen.getByText('hide duplicates'));
        expect(routerPushMock).toHaveBeenCalledWith({query: {[DUPLICATES_PARAM]: true}});
      });
    });
  });
});
