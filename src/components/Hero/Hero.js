// Framework and third-party non-ui
import React from 'react';

// App components
import WhereTo from 'components/WhereTo';

// JSON & Styles
import {
  StyledHero,
  StyledHeroContainer,
  StyledHeroTitle,
  StyledHeroHeadline,
} from './Hero-styled';

// Third-party components (buttons, icons, etc.)
import { CalciteH1, CalciteH2 } from 'calcite-react/Elements';
import ThreeDGlassesIcon from 'calcite-ui-icons-react/ThreeDGlassesIcon';

const Hero = () => {
  return (
    <StyledHero data-testid="Hero">
      <StyledHeroContainer>
        <WhereTo />
      </StyledHeroContainer>
      <StyledHeroTitle>
        <ThreeDGlassesIcon size={48} />
        <StyledHeroHeadline>
          <CalciteH1>Discover Colorado</CalciteH1>
          <CalciteH2>Plan your next outdoor adventure</CalciteH2>
        </StyledHeroHeadline>
      </StyledHeroTitle>
    </StyledHero>
  );
};

export default Hero;
