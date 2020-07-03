// Framework and third-party non-ui
import React from 'react';

// App components
import WhereTo from 'components/WhereTo';

// JSON & Styles
import {
  StyledHero,
  StyledHeroContainer,
  StyledHeroTitle,
  StyledCalciteH1
} from './Hero-styled';

// Third-party components (buttons, icons, etc.)
import { CalciteH1, CalciteH2 } from 'calcite-react/Elements';

const Hero = () => {
  return (
    <StyledHero data-testid="Hero">
      <StyledHeroTitle>
        <StyledCalciteH1>Discover Colorado</StyledCalciteH1>
        <CalciteH2>Plan your next outdoor adventure</CalciteH2>
      </StyledHeroTitle>
      <StyledHeroContainer>
        <WhereTo />
      </StyledHeroContainer>
    </StyledHero>
  );
};

export default Hero;
