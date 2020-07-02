import React from 'react';
import { render } from '@testing-library/react';
import TrailsOriginal from './TrailsOriginal';

test('renders', () => {
  const { getByText } = render(<TrailsOriginal />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
