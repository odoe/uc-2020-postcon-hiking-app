// Framework and third-party non-ui
import React from 'react';

import { useWebMap } from 'esri-loader-hooks';

// App components
import { webmapId } from 'constants/map';

// JSON & Styles
import { StyledMap } from './Map-styled';

// Third-party components (buttons, icons, etc.)

const Map = () => {
  const [ref] = useWebMap(webmapId);
  return <StyledMap ref={ref} data-testid="Map"></StyledMap>;
};

export default Map;
