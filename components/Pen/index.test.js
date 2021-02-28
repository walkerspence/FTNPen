import { render, screen } from '@testing-library/react';
import Pen from '.';

describe('<HomePage />', () => {
  test('renders the title text', () => {
    render(<Pen title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
});
