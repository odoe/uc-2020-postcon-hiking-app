/* eslint-disable react-hooks/exhaustive-deps */

import React, { createContext, useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { initView, getTrailFeature } from 'data/map';

export const MapContext = createContext();

const MapContextProvider = (props) => {
  const match = useRouteMatch('/details/:fid');
  const history = useHistory();
  const [mapView, setMapView] = useState(null);
  const [selection, setSelection] = useState(null);
  const [ready, setReady] = useState(false);
  const routeFid = match && match.params.fid;

  useEffect(() => {
    const init = async function () {
      if (mapView) {
        await initView(mapView);

        if (routeFid) {
          const feature = await getTrailFeature(routeFid);
          setSelection(feature);
        }

        setReady(true);
      }
    };
    init();
  }, [mapView]);

  useEffect(() => {
    if (mapView && routeFid) {
      const updateSelection = async function () {
        const feature = await getTrailFeature(routeFid);
        setSelection(feature);
      };
      updateSelection();
    }
  }, [routeFid]);

  useEffect(() => {
    if (selection && selection.attributes) {
      history.push(`/details/${selection.attributes.FID}`);
    }
  }, [selection, history]);

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
