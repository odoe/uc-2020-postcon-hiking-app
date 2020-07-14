import React, { createContext, useEffect, useState } from 'react';

import { initView } from 'data/map';
import dummyFeature from './dummyFeature.json';

export const MapContext = createContext();

const MapContextProvider = (props) => {
  const [mapView, setMapView] = useState(null);
  const [selection, setSelection] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async function () {
      if (mapView) {
        await initView(mapView);
        setSelection(dummyFeature);
        setReady(true);
      }
    };
    init();
  }, [mapView]);

  return (
    <MapContext.Provider
      value={{
        mapView,
        setMapView,
        selection,
        setSelection,
        ready,
      }}
    >
      {props.children}
    </MapContext.Provider>
  );
};

export default MapContextProvider;
