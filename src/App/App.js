// Framework and third-party non-ui
import React, { useEffect, useState } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';

// Hooks, context, and constants
import useSelected from 'hooks/useSelected';
import { UserContext, MapContext, SelectedContext } from 'context';
import Routes from 'constants/routes';
import { webmapId } from 'constants/map';

// App pages & components
import HomePage from 'pages/HomePage';
import MapPage from 'pages/MapPage';
import NoMatch from 'pages/NoMatch';
import LoginLink from './LoginLink';
import AccountMenu from './AccountMenu';

// JSON & Styles
import { StyledApp, OuterWrapper, InnerWrapper } from './App-styled';
import Logo from 'assets/logo.svg';

// Third-party components (buttons, icons, etc.)
import { ToastContainer } from 'calcite-react/Toaster';
import TopNav, {
  TopNavBrand,
  TopNavTitle,
  TopNavList,
  TopNavLink,
  TopNavActionsList,
} from 'calcite-react/TopNav';

const App = ({ user = {} }) => {
  const value = useSelected();
  const [userInfo, setUserInfo] = useState(user);

  // useEffect(() => {
  //   setUserInfo(user);
  // }, [user]);

  const getPages = () => {
    return (
      <Switch>
        <Route exact path={Routes.Home}>
          <HomePage user={user} />
        </Route>
        <Route path={Routes.Map}>
          <SelectedContext.Provider value={value}>
            <MapContext.Provider value={webmapId}>
              <MapPage />
            </MapContext.Provider>
          </SelectedContext.Provider>
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    );
  };

  return (
    <UserContext.Provider value={userInfo}>
      <StyledApp>
        <ToastContainer />
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
        <OuterWrapper>
          <InnerWrapper>
            <div className="App">{getPages()}</div>
          </InnerWrapper>
        </OuterWrapper>
      </StyledApp>
    </UserContext.Provider>
  );
};

export default App;
