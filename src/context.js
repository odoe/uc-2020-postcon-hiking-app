import React, { createContext } from 'react';

export const MapContext = createContext();
export const SelectedContext = createContext({
  value: null,
  setCurrentValue: () => {},
});
