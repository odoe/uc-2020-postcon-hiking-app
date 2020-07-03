// Framework and third-party non-ui
import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

// Hooks, context, and constants
import useSelected from 'hooks/useSelected';
import { UserContext, MapContext, SelectedContext } from 'context';
import Routes from 'constants/routes';
import { webmapId } from 'constants/map';

// App pages & components
import HomePage from 'pages/HomePage';
import MapPage from 'pages/MapPage';
import NoMatch from 'pages/NoMatch';

// JSON & Styles
import { StyledApp } from './App-styled';

// Third-party components (buttons, icons, etc.)
import { ToastContainer } from 'calcite-react/Toaster';

const App = ({ user = {} }) => {
  const value = useSelected();
  const [userInfo] = useState(user);

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
        {getPages()}
      </StyledApp>
    </UserContext.Provider>
  );
};

export default App;
