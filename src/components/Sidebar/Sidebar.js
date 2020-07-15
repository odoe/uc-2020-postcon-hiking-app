// Framework and third-party non-ui
import React, { useContext, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

// App components
import { MapContext } from 'contexts/MapContext';
import TrailCard, { TrailDetails } from 'components/TrailCard';

// JSON & Styles
import { StyledSidebar, StyledLoader } from './Sidebar-styled';

// Third-party components (buttons, icons, etc.)
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

// const rowHeights = new Array(1000)
//   .fill(true)
//   .map(() => 25 + Math.round(Math.random() * 50));

const getItemSize = (index) => 125; //rowHeights[index];

const Row = ({ index, style }) => <TrailCard style={style} />;

const Sidebar = () => {
  const { ready, selection } = useContext(MapContext);

  const getLoadingIndicator = () => {
    return <StyledLoader sizeRatio={1.5} text="Loading..." />;
  };

  if (!ready) {
    return getLoadingIndicator();
  }

  return (
    <StyledSidebar data-testid="Sidebar">
      <Switch>
        <Route exact path="/details/:id">
          <TrailDetails trail={selection && selection.attributes} />
        </Route>
        <Route path="/details">
          {' '}
          <AutoSizer>
            {({ height, width }) => (
              <List
                width={width}
                height={height}
                itemCount={1000}
                itemSize={getItemSize}
                estimatedItemSize={125}
              >
                {Row}
              </List>
            )}
          </AutoSizer>
        </Route>
      </Switch>
    </StyledSidebar>
  );
};

export default Sidebar;
