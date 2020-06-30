// Framework and third-party non-ui
import React from 'react';

// App components
import Hero from 'components/Hero/index.js';

// JSON & Styles
import { StyledPageWrapper } from 'pages/Pages-styled';

// Third-party components (buttons, icons, etc.)
import { CalciteH1 } from 'calcite-react/Elements';

const HomePage = () => {
  return (
    <StyledPageWrapper>
      <CalciteH1>Welcome to: HomePage!</CalciteH1>
      <Hero />
    </StyledPageWrapper>
  );
};

export default HomePage;
