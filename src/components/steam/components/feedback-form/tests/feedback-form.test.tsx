import {fireEvent, render, screen} from '@testing-library/react';
import {FeedbackForm} from '../feedback-form';

const routerPushMock = jest.fn();
const dispatchMock = jest.fn();

jest.mock('../../../../../services', () => ({noop: jest.fn()}));
jest.mock('next/router', () => ({useRouter: () => ({push: routerPushMock})}));
jest.mock('react-redux', () => ({useDispatch: () => dispatchMock, useSelector: jest.fn()}));

describe('FeedbackForm', () => {
  it('should render correctly', () => {
    const {container} = render(<FeedbackForm />);
    expect(container).toMatchSnapshot();
  });
  describe('when changing form value', () => {
    it('updates form state', () => {
      render(<FeedbackForm />);
      const changedValue = 'MyName';
      const nameInput = screen.getByPlaceholderText('Your name or e-mail');
      fireEvent.change(nameInput, {target: {value: changedValue}});
      expect(screen.getByTestId('feedback-form')).toHaveFormValues({name: changedValue});
    });
  });
  describe('when required fields not filled', () => {
    it('should render validation error messages', () => {
      render(<FeedbackForm />);
      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
      expect(screen.getAllByText('Required field')).toHaveLength(2);
    });
  });
  describe('when entered data is correct and user submit form', () => {
    it('should call dispatch action', () => {
      render(<FeedbackForm />);
      const nameInput = screen.getByPlaceholderText('Your name or e-mail');
      const textInput = screen.getByPlaceholderText('Write feedback');
      fireEvent.change(nameInput, {target: {value: 'John'}});
      fireEvent.change(textInput, {target: {value: 'Text'}});
      fireEvent.click(screen.getByText('Submit'));
      expect(dispatchMock).toHaveBeenCalled();
    });
  });
});
