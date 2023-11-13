import {render, screen} from '@testing-library/react';
import Feedback from '../pages/feedback';

jest.mock('../src/services', () => ({noop: () => jest.fn()}));
jest.mock('next/router', () => ({useRouter: () => ({push: jest.fn()})}));
jest.mock('react-redux', () => ({useDispatch: () => jest.fn(), useSelector: jest.fn()}));

describe('Feedback', () => {
  it('should render correctly', () => {
    render(<Feedback />);
    expect(screen.getByTestId('feedback-form')).toBeInTheDocument();
  });
});
