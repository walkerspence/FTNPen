import React from 'react';
import HomePage from 'pages/index';
import { render, screen } from '@testing-library/react';

describe('/', () => {
  test('renders the blog title', () => {
    render(<HomePage />);
    expect(screen.getByText('FTN Pen')).toBeInTheDocument();
  });
});
