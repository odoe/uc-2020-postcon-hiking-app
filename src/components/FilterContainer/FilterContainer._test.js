import React from 'react';
import { render } from '@testing-library/react';
import FilterContainer from './FilterContainer';

test('renders', () => {
  const { getByText } = render(<FilterContainer />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
