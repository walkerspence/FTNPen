import HomePage from 'pages/index';
import { render, screen } from '@testing-library/react';

describe('HomePage', () => {
  test('renders a div', () => {
    render(<HomePage />);
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });
});
