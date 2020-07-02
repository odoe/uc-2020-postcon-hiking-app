// Framework and third-party non-ui
import React from 'react';

// App components

// JSON & Styles
import { StyledSubNav } from './SubNav-styled';
import FilterContainer from 'components/FilterContainer';

// Third-party components (buttons, icons, etc.)

const SubNav = () => {
  return (
    <StyledSubNav data-testid="SubNav">
      <FilterContainer />
    </StyledSubNav>
  );
};

export default SubNav;
