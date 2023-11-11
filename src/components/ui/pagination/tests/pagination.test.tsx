import {fireEvent, render, screen} from '@testing-library/react';
import {Pagination} from '../pagination';

describe('Pagination', () => {
  const onPageChangeMock = jest.fn();
  const props = {pagesCount: 2, currentPage: 1, onPageChange: onPageChangeMock};
  it('should render correctly', () => {
    const {container} = render(<Pagination {...props} />);
    expect(container).toMatchSnapshot();
  });
  describe('when user clicks on another page', () => {
    it('should call onPageChange', () => {
      render(<Pagination {...props} />);
      const button = screen.getAllByRole('button');
      fireEvent.click(button[button.length - 1]);
      expect(onPageChangeMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('when pages count is 1', () => {
    it("shouldn't render buttons list", () => {
      render(<Pagination {...props} pagesCount={1} />);
      const list = screen.queryByRole('list');
      expect(list).not.toBeInTheDocument();
    });
  });
});
