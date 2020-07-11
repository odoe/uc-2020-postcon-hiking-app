// Framework and third-party non-ui
import React from 'react';

// App components

// JSON & Styles
import { StyledSidebar } from './Sidebar-styled';
import TrailCard from 'components/TrailCard';

// Third-party components (buttons, icons, etc.)
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

// const rowHeights = new Array(1000)
//   .fill(true)
//   .map(() => 25 + Math.round(Math.random() * 50));

const getItemSize = (index) => 125; //rowHeights[index];

const Row = ({ index, style }) => <TrailCard style={style} />;

const Sidebar = () => {
  return (
    <StyledSidebar data-testid="Sidebar">
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
    </StyledSidebar>
  );
};

export default Sidebar;
