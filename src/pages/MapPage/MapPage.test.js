import React from 'react';
import { render } from '@testing-library/react';
import MapPage from './MapPage';

test('renders Welcome to the sandbox', () => {
  const { getByText } = render(<MapPage />);
  const linkElement = getByText(/Welcome to the sandbox/i);
  expect(linkElement).toBeInTheDocument();
});
