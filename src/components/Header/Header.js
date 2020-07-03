// Framework and third-party non-ui
import React from 'react';
import { NavLink } from 'react-router-dom';

// Hooks, context, and constants
import Routes from 'constants/routes';

// App pages & components
import LoginLink from './LoginLink';
import AccountMenu from './AccountMenu';

// JSON & Styles
import Logo from 'assets/logo.svg';

// Third-party components (buttons, icons, etc.)
import TopNav, {
  TopNavBrand,
  TopNavTitle,
  TopNavList,
  TopNavLink,
  TopNavActionsList,
} from 'calcite-react/TopNav';

const App = ({ user = {} }) => {
  return (
    <TopNav>
      <TopNavBrand as={NavLink} to={Routes.Home} src={Logo} />
      <TopNavTitle as={NavLink} to={Routes.Home}>
        Discover Colorado
      </TopNavTitle>
      <TopNavList>
        <TopNavLink as={NavLink} to={Routes.Map}>
          Map
        </TopNavLink>
      </TopNavList>
      <TopNavActionsList>
        {user.username ? <AccountMenu user={user} /> : <LoginLink />}
      </TopNavActionsList>
    </TopNav>
  );
};

export default App;
