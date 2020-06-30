import React from 'react';
import { render } from '@testing-library/react';
import NoMatch from './NoMatch';

test('renders Welcome to the sandbox', () => {
  const { getByText } = render(<NoMatch />);
  const linkElement = getByText(/Welcome to the sandbox/i);
  expect(linkElement).toBeInTheDocument();
});
