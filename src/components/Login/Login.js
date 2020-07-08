// Framework and third-party non-ui
import React from 'react';

// App components
import { signIn } from 'data/oauth';

// JSON & Styles
import { StyledLoginButton } from './Login-styled';

// Third-party components (buttons, icons, etc.)

const Login = () => {
  const attemptLogin = async () => {
    try {
      const credential = await signIn();
      console.log(credential);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledLoginButton data-testid="Login" onClick={attemptLogin}>
      Login
    </StyledLoginButton>
  );
};

export default Login;
