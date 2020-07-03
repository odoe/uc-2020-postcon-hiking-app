import React, { createContext, useState } from 'react';

export const MapContext = createContext();

const MapContextProvider = (props) => {
  const [mapView, setMapView] = useState(null);

  return (
    <MapContext.Provider value={{ mapView, setMapView }}>
      {props.children}
    </MapContext.Provider>
  );
};

export default MapContextProvider;
