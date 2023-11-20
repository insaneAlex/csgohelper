import {render, screen} from '@testing-library/react';
import {describe} from 'node:test';
import {Loader} from '../loader';

describe('Loader', () => {
  it('should render correctly', () => {
    render(<Loader />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
