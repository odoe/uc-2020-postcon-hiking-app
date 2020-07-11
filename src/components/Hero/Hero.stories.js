import React from 'react';
import Hero from '.';

import MapContextProvider from 'contexts/MapContext';

export default {
  title: 'Hero',
  component: Hero,
};

export const Default = () => (
  <MapContextProvider>
    <Hero>Hero</Hero>
  </MapContextProvider>
);
