import React from 'react';
import { render } from '@testing-library/react';
import HomePage from './HomePage';

test('renders Welcome to the sandbox', () => {
  const { getByText } = render(<HomePage />);
  const linkElement = getByText(/Welcome to the sandbox/i);
  expect(linkElement).toBeInTheDocument();
});
