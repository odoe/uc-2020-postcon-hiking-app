import React from 'react';
import { render } from '@testing-library/react';
import TrailDetails from './TrailDetails';

test('renders', () => {
  const { getByText } = render(<TrailDetails />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
