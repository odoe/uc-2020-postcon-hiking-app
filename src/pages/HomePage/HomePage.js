// Framework and third-party non-ui
import React from 'react';

// App components
import Hero from 'components/Hero';
import PopularTrail from 'components/PopularTrail';

// JSON & Styles
import { PopularTrailsContainer } from './HomePage-styled';
import { StyledPageWrapper } from 'pages/Pages-styled';

// Third-party components (buttons, icons, etc.)

const HomePage = () => {
  return (
    <StyledPageWrapper data-testid="HomePage">
      <Hero />
      <PopularTrailsContainer>
        <PopularTrail id={0} />
        <PopularTrail id={1} />
        <PopularTrail id={2} />
      </PopularTrailsContainer>
    </StyledPageWrapper>
  );
};

export default HomePage;
