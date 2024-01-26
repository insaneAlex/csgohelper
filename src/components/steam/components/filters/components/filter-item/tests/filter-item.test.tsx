import {fireEvent, render, screen} from '@testing-library/react';
import {FilterItem} from '../filter-item';
import {NextRouter} from 'next/router';

jest.mock('../../../../../../../services', () => ({}));

const RIFLE = 'Rifle';
const AUG = 'AUG';
const M4A1 = 'M4A1';
const possibleFiltersMock = {[RIFLE]: [AUG, M4A1]};
const mockRouter = {query: {}, push: jest.fn()} as unknown as NextRouter;
const onFilterUpdateMock = jest.fn();

describe('FilterItem', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('when user clicks on filter', () => {
    it('should call onFilterUpdate with props', () => {
      render(
        <FilterItem
          filter={RIFLE}
          isChecked
          subFilters={possibleFiltersMock[RIFLE]}
          router={mockRouter}
          onFilterUpdate={onFilterUpdateMock}
        />
      );
      fireEvent.click(screen.getByText(RIFLE));
      expect(onFilterUpdateMock).toHaveBeenCalledWith({'filter': RIFLE});
    });
  });
  describe('when user clicks on subfilter', () => {
    it('should call onFilterUpdate with props', () => {
      render(
        <FilterItem
          filter={RIFLE}
          isChecked
          subFilters={possibleFiltersMock[RIFLE]}
          router={mockRouter}
          onFilterUpdate={onFilterUpdateMock}
        />
      );
      fireEvent.click(screen.getByText(AUG));
      expect(onFilterUpdateMock).toHaveBeenCalledWith({'filter': RIFLE, 'subFilter': AUG});
    });
  });
  describe('when user mouse enter list area', () => {
    it('should apply listActive class', () => {
      render(
        <FilterItem
          filter={RIFLE}
          isChecked
          subFilters={possibleFiltersMock[RIFLE]}
          router={mockRouter}
          onFilterUpdate={onFilterUpdateMock}
        />
      );
      fireEvent.mouseEnter(screen.getByText(RIFLE));
      expect(screen.getByRole('list')).toHaveClass('listActive');
    });
  });
  describe('when user mouse leave filter area', () => {
    it('list should not have listActive class', () => {
      render(
        <FilterItem
          isChecked
          filter={RIFLE}
          router={mockRouter}
          subFilters={possibleFiltersMock[RIFLE]}
          onFilterUpdate={onFilterUpdateMock}
        />
      );

      fireEvent.mouseEnter(screen.getByText(RIFLE));
      expect(screen.getByRole('list')).toHaveClass('listActive');
      fireEvent.mouseLeave(screen.getByTestId('filterCheckbox'));
      expect(screen.getByRole('list')).not.toHaveClass('listActive');
    });
  });
});
