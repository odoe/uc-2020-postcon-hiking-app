import { createContext } from 'react';

export const MapContext = createContext();
export const UserContext = createContext();
export const SelectedContext = createContext({
  value: null,
  setCurrentValue: () => {},
});
