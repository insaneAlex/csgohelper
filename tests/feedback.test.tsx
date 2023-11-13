/* eslint-disable @typescript-eslint/no-explicit-any */
import {FeedbackStatuses, onResetState} from '../src/redux/features';
import {render, screen} from '@testing-library/react';
import Feedback from '../pages/feedback';
import {useSelector} from 'react-redux';

const dispatchMock = jest.fn();
jest.mock('../src/services', () => ({}));
jest.mock('next/router', () => ({useRouter: () => ({push: jest.fn()})}));
jest.mock('react-redux', () => ({useSelector: jest.fn(), useDispatch: () => dispatchMock}));

describe('Feedback', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('on initial load', () => {
    it('should render form', () => {
      (useSelector as any).mockReturnValueOnce(FeedbackStatuses.IDLE);
      render(<Feedback />);
      expect(screen.getByTestId('feedback-form')).toBeInTheDocument();
    });
  });
  describe('when feedback is success', () => {
    it('should render return to home btn', () => {
      (useSelector as any).mockReturnValueOnce(FeedbackStatuses.SUCCESS);
      render(<Feedback />);
      expect(screen.getByText('Return to Home')).toBeInTheDocument();
    });
  });
  describe('when unmounting', () => {
    it('should call onResetState once', () => {
      const utils = render(<Feedback />);
      utils.unmount();
      expect(dispatchMock).toHaveBeenCalledTimes(1);
      expect(dispatchMock).toHaveBeenCalledWith(onResetState());
    });
  });
});
