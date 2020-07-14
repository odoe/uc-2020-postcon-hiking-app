// Framework and third-party non-ui
import React, { useContext, useEffect } from 'react';

import { useWebMap, useWatch } from 'esri-loader-hooks';

// App components
import MapLoader from './MapLoader';
import { MapContext } from 'contexts/MapContext';
import { webmapId } from 'constants/map';
import { filterMapData } from 'data/map';

// JSON & Styles
import { StyledMap } from './Map-styled';

// Third-party components (buttons, icons, etc.)

const Map = () => {
  const { ready, mapView, setMapView, selection } = useContext(MapContext);
  const [ref, view] = useWebMap(webmapId);

  useEffect(() => {
    if (selection) {
      // If the selected feature changes (in MapContext), call filterMapData
      filterMapData([selection.attributes['FID']]);
    }
  }, [selection]);

  const handleMapReady = () => {
    setMapView(view);
  };

  useWatch(view, 'ready', handleMapReady);
  return (
    <>
      {!ready ? <MapLoader /> : null}
      <StyledMap ref={ref} data-testid="Map"></StyledMap>
    </>
  );
};

export default Map;
