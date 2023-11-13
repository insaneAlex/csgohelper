import {fireEvent, render, screen} from '@testing-library/react';
import {Button} from '../button';

jest.mock('../../../../services', () => ({}));

describe('Button', () => {
  it('should render correctly', () => {
    render(<Button>Test</Button>);

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  describe('when user clicks', () => {
    it('should call onClick handler', () => {
      const onClickMock = jest.fn();
      render(<Button onClick={onClickMock}>button</Button>);
      fireEvent.click(screen.getByText('button'));

      expect(onClickMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('when disabled prop is true', () => {
    it('disables the button', () => {
      render(<Button disabled>click me</Button>);
      expect(screen.getByText('click me')).toBeDisabled();
    });
  });

  describe('when loading prop is true', () => {
    it('applies loading styles', () => {
      render(<Button loading>click me</Button>);
      expect(screen.getByText('click me')).toHaveClass('loading');
    });
  });

  describe('when is submit type', () => {
    it('should apply submit type', () => {
      render(<Button isSubmit>Submit</Button>);
      expect(screen.getByText('Submit')).toHaveAttribute('type', 'submit');
    });
  });
});
