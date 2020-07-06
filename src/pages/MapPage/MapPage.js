// Framework and third-party non-ui
import React from 'react';
import { useParams } from "react-router-dom";

// App components
import SubNav from 'components/SubNav';
import Sidebar from 'components/Sidebar';
import Map from 'components/Map';

// JSON & Styles
import {
  MapPageLayout,
  StyledInnerWrapper,
  StyledSidebar,
  StyledMapContainer,
} from './MapPage-styled';

// Third-party components (buttons, icons, etc.)

const MapPage = () => {
  // eslint-disable-next-line no-unused-vars
  const { context } = useParams();
  return (
    <MapPageLayout data-testid="MapPage">
      <SubNav />
      <StyledInnerWrapper>
        <StyledSidebar>
          <Sidebar />
        </StyledSidebar>
        <StyledMapContainer>
          <Map />
        </StyledMapContainer>
      </StyledInnerWrapper>
    </MapPageLayout>
  );
};

export default MapPage;
