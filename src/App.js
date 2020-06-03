import React from 'react';

import Trails from './components/Trails';

import './App.css';

import { MapContext, SelectedContext } from './context';
import useSelected from './hooks/useSelected'

const webmapid = '8744e84b32e74bffb34b0b1edf0c3d60';

function App() {
  const value = useSelected();
  return (
    <SelectedContext.Provider value={value}>
      <MapContext.Provider value={webmapid}>
        <div className="App">
          <header className="App-header">
            Trails
          </header>
          <Trails />
        </div>
      </MapContext.Provider>
    </SelectedContext.Provider>
  );
}

export default App;
