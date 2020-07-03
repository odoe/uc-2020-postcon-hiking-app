// Framework and third-party non-ui
import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

// Hooks, context, and constants
import useSelected from 'hooks/useSelected';
import { UserContext, SelectedContext } from 'contexts/context';
import MapContextProvider from 'contexts/MapContext';
import Routes from 'constants/routes';

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
  return (
    <UserContext.Provider value={userInfo}>
      <StyledApp data-testid="App">
        <ToastContainer />
        <Switch>
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
      </StyledApp>
    </UserContext.Provider>
  );
};

export default App;
