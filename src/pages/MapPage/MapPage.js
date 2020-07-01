// Framework and third-party non-ui
import React from 'react';

// App components
import Trails from 'components/Trails';

// JSON & Styles
import { StyledPageWrapper } from 'pages/Pages-styled';

// Third-party components (buttons, icons, etc.)

const MapPage = () => {
  return (
    <StyledPageWrapper data-testid="MapPage">
      <Trails />
    </StyledPageWrapper>
  );
};

export default MapPage;
