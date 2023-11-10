/**
 * @jest-environment jsdom
 */

import {render, screen} from '@testing-library/react';
import {ErrorAlert} from './error-alert';

it('App Router: Works with Client Components (React State)', () => {
  render(<ErrorAlert>Some error</ErrorAlert>);
  expect(screen.getByText('Some error')).toHaveTextContent('Some error');
});
