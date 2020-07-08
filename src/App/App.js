// Framework and third-party non-ui
import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Hooks, context, and constants
import useSelected from 'hooks/useSelected';
import { UserContext, SelectedContext } from 'contexts/context';
import MapContextProvider from 'contexts/MapContext';
import Routes from 'constants/routes';
import { initialize } from 'data/oauth';

// App pages & components
import HomePage from 'pages/HomePage';
import MapPage from 'pages/MapPage';
import NoMatch from 'pages/NoMatch';

// Third-party components (buttons, icons, etc.)
import { ToastContainer } from 'calcite-react/Toaster';

const App = ({ user = {} }) => {
  const value = useSelected();
  const [userInfo] = useState(user);

  useEffect(() => {
    initialize('xlMqVpNnXme9RSQA', 'https://www.arcgis.com');
  }, []);

  return (
    <UserContext.Provider value={userInfo}>
      <ToastContainer />
      <Switch>
        <Route exact path={Routes.Home}>
          <Redirect to="/home" />
        </Route>
        <Route path={Routes.Map}>
          <SelectedContext.Provider value={value}>
            <MapContextProvider>
              <HomePage user={user} />
              <MapPage />
            </MapContextProvider>
          </SelectedContext.Provider>
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </UserContext.Provider>
  );
};

export default App;
