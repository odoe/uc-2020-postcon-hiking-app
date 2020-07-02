// Framework and third-party non-ui
import React from 'react';

// App components
import SubNav from 'components/SubNav';
import Sidebar from 'components/Sidebar';

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
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              fontSize: '3rem',
            }}
          >
            <div>MAP PLACEHOLDER</div>
          </div>
        </StyledMapContainer>
      </StyledInnerWrapper>
    </StyledPageWrapper>
  );
};

export default MapPage;
