import {fireEvent, render, screen} from '@testing-library/react';
import {FeedbackSuccess} from '../feedback-success';

const routerPushMock = jest.fn();
jest.mock('next/router', () => ({useRouter: () => ({push: routerPushMock})}));

describe('FeedbackSuccess', () => {
  it('should render correctly', () => {
    const {container} = render(<FeedbackSuccess />);
    expect(container).toMatchSnapshot();
  });
  describe('when user clicks "Return to Home" button', () => {
    it('should push "/" route', () => {
      render(<FeedbackSuccess />);
      fireEvent.click(screen.getByRole('button', {name: /Return to Home/i}));
      expect(routerPushMock).toHaveBeenCalledWith('/');
    });
  });
});
