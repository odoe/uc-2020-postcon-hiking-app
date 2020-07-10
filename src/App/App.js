// Framework and third-party non-ui
import React, { useEffect, useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Hooks, context, and constants
import useSelected from 'hooks/useSelected';
import { SelectedContext } from 'contexts/context';
import MapContextProvider from 'contexts/MapContext';
import { UserContext } from 'contexts/UserContext';
import Routes from 'constants/routes';
import { initialize, checkCurrentStatus } from 'data/oauth';

// App pages & components
import HomePage from 'pages/HomePage';
import MapPage from 'pages/MapPage';
import NoMatch from 'pages/NoMatch';

// Third-party components (buttons, icons, etc.)
import { ToastContainer } from 'calcite-react/Toaster';

const App = () => {
  const { setOauthInfo, setUserInfo } = useContext(UserContext);
  const value = useSelected();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const oauthInfo = await initialize(
          'xlMqVpNnXme9RSQA',
          'https://www.arcgis.com'
        );
        setOauthInfo(oauthInfo);

        console.log('checking sign in with oauthinfo:', oauthInfo);
        const userInfo = await checkCurrentStatus(oauthInfo);
        console.log(userInfo);
        if (userInfo) {
          setUserInfo(userInfo);
        }
      } catch (error) {}
    };
    initAuth();
  }, [setOauthInfo, setUserInfo]);

  return (
    <>
      <ToastContainer />
      <Switch>
        <Route exact path={Routes.Home}>
          <Redirect to="/home" />
        </Route>
        <Route path={Routes.Map}>
          <SelectedContext.Provider value={value}>
            <MapContextProvider>
              <HomePage />
              <MapPage />
            </MapContextProvider>
          </SelectedContext.Provider>
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </>
  );
};

export default App;
