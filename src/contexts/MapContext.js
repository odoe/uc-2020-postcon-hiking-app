import React, { createContext, useEffect, useState } from 'react';

import { initView } from 'data/map';

export const MapContext = createContext();

const MapContextProvider = (props) => {
  const [mapView, setMapView] = useState(null);

  useEffect(() => {
    if (mapView) {
      initView(mapView);
    }
  }, [mapView]);

  return (
    <MapContext.Provider value={{ mapView, setMapView }}>
      {props.children}
    </MapContext.Provider>
  );
};

export default MapContextProvider;
