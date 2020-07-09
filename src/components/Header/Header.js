// Framework and third-party non-ui
import React from 'react';

// App components
import Search from 'calcite-react/Search';

// JSON & Styles
import { StyledHeader, StyledCalciteH1 } from './Header-styled';

// Third-party components (buttons, icons, etc.)

const Header = () => {
  return (
    <StyledHeader data-testid="Header">
      <StyledCalciteH1>Discover Colorado</StyledCalciteH1>
      <Search />
    </StyledHeader>
  );
};

export default Header;
