// Framework and third-party non-ui
import React, { useContext } from 'react';

// App components
import { UserContext } from 'contexts/UserContext';
import WhereTo from 'components/WhereTo';
import Login from 'components/Login';

// JSON & Styles
import {
  StyledHero,
  StyledUser,
  StyledHeroContainer,
  StyledLoginContainer,
  StyledHeroTitle,
  StyledCalciteH1,
  StyledCalciteH2,
} from './Hero-styled';

// Third-party components (buttons, icons, etc.)
import User from 'components/User';

const Hero = () => {
  const { ready, userInfo } = useContext(UserContext);

  return (
    <StyledHero data-testid="Hero">
      <StyledUser>
        {ready && userInfo ? <User userInfo={userInfo} /> : null}
      </StyledUser>
      <StyledHeroTitle>
        <StyledCalciteH1>Discover Colorado</StyledCalciteH1>
        <StyledCalciteH2>Plan your next outdoor adventure</StyledCalciteH2>
      </StyledHeroTitle>
      <StyledHeroContainer>
        <WhereTo />
      </StyledHeroContainer>
      <StyledLoginContainer>
        {!ready || userInfo ? null : <Login extraLarge />}
      </StyledLoginContainer>
    </StyledHero>
  );
};

export default Hero;
