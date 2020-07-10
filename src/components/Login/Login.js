// Framework and third-party non-ui
import React, { useContext } from 'react';

// App components
import { signIn } from 'data/oauth';
import { UserContext } from 'contexts/UserContext';

// JSON & Styles
import { StyledLoginButton } from './Login-styled';

// Third-party components (buttons, icons, etc.)

const Login = () => {
  const { userInfo, setUserInfo, oauthInfo } = useContext(UserContext);

  const attemptLogin = async () => {
    try {
      const userInfo = await signIn(oauthInfo);
      setUserInfo(userInfo);
    } catch (error) {}
  };

  if (!userInfo) {
    return (
      <StyledLoginButton data-testid="Login" onClick={attemptLogin}>
        Login
      </StyledLoginButton>
    );
  }

  return null;
};

export default Login;
