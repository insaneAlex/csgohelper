import {render} from '@testing-library/react';
import {Checkbox} from '../checkbox';

describe('Checkbox', () => {
  it('should render correctly', () => {
    const {container} = render(<Checkbox name="test" label="test1" />);
    expect(container).toMatchSnapshot();
  });

  describe('if is checked', () => {
    it('should have checked class', () => {
      const {container} = render(<Checkbox defaultChecked name="test" label="test1" />);
      const checkedLabel = container.querySelector('.label.checked');

      expect(checkedLabel).toBeInTheDocument();
    });
  });
});
