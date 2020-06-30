import React from 'react';
import { useLocation } from 'react-router-dom';

import { TopNavLink } from 'calcite-react/TopNav';

const LoginLink = () => {
  useLocation();
  // TODO: add new auth component from arcgis-assistant when its ready
  return <TopNavLink>Sign In</TopNavLink>;
};

export default LoginLink;
