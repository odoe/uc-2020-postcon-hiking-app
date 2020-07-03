// Framework and third-party non-ui
import React from 'react';

// App components
import SubNav from 'components/SubNav';
import Sidebar from 'components/Sidebar';
import Map from 'components/Map';

// JSON & Styles
import { StyledPageWrapper } from 'pages/Pages-styled';
import {
  StyledInnerWrapper,
  StyledSidebar,
  StyledMapContainer,
} from './MapPage-styled';

// Third-party components (buttons, icons, etc.)

const MapPage = () => {
  return (
    <StyledPageWrapper data-testid="MapPage">
      <SubNav />
      <StyledInnerWrapper>
        <StyledSidebar>
          <Sidebar />
        </StyledSidebar>
        <StyledMapContainer>
          <Map />
        </StyledMapContainer>
      </StyledInnerWrapper>
    </StyledPageWrapper>
  );
};

export default MapPage;
