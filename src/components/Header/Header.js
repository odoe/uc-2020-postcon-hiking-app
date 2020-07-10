// Framework and third-party non-ui
import React from 'react';

// App components
import Search from 'calcite-react/Search';
import Breakpoint from 'App/Breakpoint';

import LayerBasemapIcon from 'calcite-ui-icons-react/LayerBasemapIcon';

// JSON & Styles
import {
  StyledHeader,
  StyledCalciteH1,
  SearchWrapper,
  UserWrapper,
} from './Header-styled';

// Third-party components (buttons, icons, etc.)

const Header = () => {
  return (
    <StyledHeader data-testid="Header">
      <SearchWrapper>
        <Search />
      </SearchWrapper>
      <StyledCalciteH1>
        <Breakpoint name="desktop">Discover Colorado</Breakpoint>
      </StyledCalciteH1>
      <UserWrapper>
        <Breakpoint name="phone">
          <LayerBasemapIcon size={32} />
          BB
        </Breakpoint>
        <Breakpoint name="notPhone">Bill Bryson</Breakpoint>
      </UserWrapper>
    </StyledHeader>
  );
};

export default Header;
