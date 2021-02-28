import { render, screen } from '@testing-library/react';
import HomePage from '.';

describe('<HomePage />', () => {
  test('renders the home page text', () => {
    render(<HomePage />);
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });
});
