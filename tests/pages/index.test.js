import HomePage from 'index';
import { render, screen } from '@testing-library/react';

describe('/', () => {
  test('renders the homepage component', () => {
    render(<HomePage />);
    expect(screen.getByTestId('homeContainer')).toBeDefined();
  });
});
