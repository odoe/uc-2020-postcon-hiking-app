// Framework and third-party non-ui
import React from 'react';

// App components

// JSON & Styles
import { StyledSidebar } from './Sidebar-styled';
import TrailCard from 'components/TrailCard';

// Third-party components (buttons, icons, etc.)

const Sidebar = () => {
  return (
    <StyledSidebar data-testid="Sidebar">
      <TrailCard />
      <TrailCard />
      <TrailCard />
    </StyledSidebar>
  );
};

export default Sidebar;
