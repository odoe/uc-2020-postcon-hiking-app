// Framework and third-party non-ui
import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

// App components
import { MapContext } from 'contexts/MapContext';
import { TrailDetails } from 'components/TrailCard';

// JSON & Styles
import { StyledSidebar, StyledLoader } from './Sidebar-styled';

// Third-party components (buttons, icons, etc.)
import TrailsList from 'components/TrailsList';

const Sidebar = () => {
  const { ready, selection } = useContext(MapContext);

  return (
    <StyledSidebar data-testid="Sidebar">
      <Switch>
        <Route exact path="/details/:id">
          <TrailDetails
            ready={ready}
            trail={selection && selection.attributes}
          />
        </Route>
        <Route path="/details">
          <TrailsList ready={ready} />
        </Route>
      </Switch>
    </StyledSidebar>
  );
};

export default Sidebar;
