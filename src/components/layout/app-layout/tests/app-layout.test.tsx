import {render, screen} from '@testing-library/react';
import {AppLayout} from '../app-layout';

describe('AppLayout', () => {
  it('should render child correctly', () => {
    render(<AppLayout>mock content</AppLayout>);
    expect(screen.getByText('mock content')).toBeInTheDocument();
  });
  it('should render layout correctly', () => {
    render(<AppLayout>mock content</AppLayout>);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
