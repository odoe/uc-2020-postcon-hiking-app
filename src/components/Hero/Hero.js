// Framework and third-party non-ui
import React, { useContext, useEffect } from 'react';

// App components
import { UserContext } from 'contexts/UserContext';
import WhereTo from 'components/WhereTo';
import Login from 'components/Login';
import { signOut } from 'data/oauth';

// JSON & Styles
import {
  StyledHero,
  StyledUser,
  StyledHeroContainer,
  StyledHeroTitle,
  StyledCalciteH1,
  StyledCalciteH2,
} from './Hero-styled';

// Third-party components (buttons, icons, etc.)
import Button from 'calcite-react/Button';
import SignOutIcon from 'calcite-ui-icons-react/SignOutIcon';

const Hero = () => {
  const { userInfo, oauthInfo } = useContext(UserContext);

  // TODO: useEffect to display username when logged in

  const getUser = () => {
    if (userInfo && userInfo.user) {
      return (
        <StyledUser>
          {`Welcome, ${userInfo.user.fullName}!`}{' '}
          <Button
            iconButton
            icon={<SignOutIcon />}
            onClick={() => signOut(oauthInfo)}
          />
        </StyledUser>
      );
    }

    return null;
  };

  return (
    <StyledHero data-testid="Hero">
      <StyledUser>{getUser()}</StyledUser>
      <StyledHeroTitle>
        <StyledCalciteH1>Discover Colorado</StyledCalciteH1>
        <StyledCalciteH2>Plan your next outdoor adventure</StyledCalciteH2>
      </StyledHeroTitle>
      <StyledHeroContainer>
        <WhereTo />
        <Login />
      </StyledHeroContainer>
    </StyledHero>
  );
};

export default Hero;
