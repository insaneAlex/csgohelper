import {fireEvent, render, screen} from '@testing-library/react';
import {Filters} from '../filters';
import {NextRouter} from 'next/router';

const SNIPER_RIFLE = 'Sniper Rifle';
const RIFLE = 'Rifle';
const CONTAINER = 'Container';
const AWP = 'AWP';
const AUG = 'AUG';
const M4A1 = 'M4A1';
const AK_47 = 'AK-47';

type pushArg = Record<string, Record<string, string[]>>;

const possibleFiltersMock = {[RIFLE]: [AUG, M4A1, AK_47], [SNIPER_RIFLE]: [AWP], [CONTAINER]: []};
const pushMock = jest.fn();
const mockRouter = {query: {}, push: (a: pushArg) => pushMock(a)} as unknown as NextRouter;

describe('Filters', () => {
  describe('should render filters', () => {
    it('should render correctly', () => {
      render(<Filters router={mockRouter} possibleFilters={possibleFiltersMock} />);
      expect(screen.getByText(RIFLE)).toBeInTheDocument();
      expect(screen.getByText(SNIPER_RIFLE)).toBeInTheDocument();
      expect(screen.getByText(CONTAINER)).toBeInTheDocument();
    });
  });
  describe('when only 1 subfilter', () => {
    it('shouldnt render subfilter', () => {
      render(<Filters router={mockRouter} possibleFilters={possibleFiltersMock} />);
      expect(screen.queryByText(AWP)).not.toBeInTheDocument();
    });
  });
  describe('when more than 1 subfilter', () => {
    it('should render subfilters', () => {
      render(<Filters router={mockRouter} possibleFilters={possibleFiltersMock} />);
      expect(screen.getByText(AUG)).toBeInTheDocument();
      expect(screen.getByText(M4A1)).toBeInTheDocument();
      expect(screen.getByText(AK_47)).toBeInTheDocument();
    });
  });
  describe('when user click on filter', () => {
    it('should call router push method', () => {
      render(<Filters router={mockRouter} possibleFilters={possibleFiltersMock} />);
      fireEvent.click(screen.getByText(RIFLE));
      const expectedArg = {'query': {[RIFLE]: [], type: [RIFLE]}};
      expect(pushMock).toHaveBeenCalledWith(expectedArg);
    });
  });
  describe('when user click on subfilter', () => {
    it('should call router push method', () => {
      render(<Filters router={mockRouter} possibleFilters={possibleFiltersMock} />);
      fireEvent.click(screen.getByText(M4A1));
      const expectedArg = {'query': {[RIFLE]: [M4A1]}};
      expect(pushMock).toHaveBeenCalledWith(expectedArg);
    });
  });
});
