import React from 'react';
import { render } from '@testing-library/react';
import SubNav from './SubNav';

test('renders', () => {
  const { getByText } = render(<SubNav />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
