// Framework and third-party non-ui
import React, { useContext } from 'react';

import { useWebMap, useWatch } from 'esri-loader-hooks';

// App components
import { MapContext } from 'contexts/MapContext';
import { webmapId } from 'constants/map';

// JSON & Styles
import { StyledMap } from './Map-styled';

// Third-party components (buttons, icons, etc.)

const Map = () => {
  const { setMapView } = useContext(MapContext);
  const [ref, view] = useWebMap(webmapId);

  const handleMapReady = (e) => {
    console.log(view);
    setMapView(view);
  };

  useWatch(view, 'ready', handleMapReady);
  return <StyledMap ref={ref} data-testid="Map"></StyledMap>;
};

export default Map;
