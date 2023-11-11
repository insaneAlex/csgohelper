import {render} from '@testing-library/react';
import {describe} from 'node:test';
import {Loader} from '../loader';

describe('Loader', () => {
  it('should render correctly', () => {
    const {container} = render(<Loader />);
    expect(container).toMatchSnapshot();
  });
});
