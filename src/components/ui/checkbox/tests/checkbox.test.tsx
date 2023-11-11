import {render, screen} from '@testing-library/react';
import {Checkbox} from '../checkbox';

describe('Checkbox', () => {
  it('should render correctly', () => {
    const {container} = render(<Checkbox name="test" label="test1" />);
    expect(container).toMatchSnapshot();
  });
  describe('if is checked', () => {
    it('should have checked class', () => {
      render(<Checkbox defaultChecked name="test" label="test1" />);
      expect(screen.getByTestId('checkbox-label')).toHaveClass('checked');
    });
  });
});
