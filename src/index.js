// React
import React from 'react';
import ReactDOM from 'react-dom';

// React Router
import { BrowserRouter, Route } from 'react-router-dom';

// Calcite React
import CalciteThemeProvider from 'calcite-react/CalciteThemeProvider';

// PWA
import * as serviceWorker from './serviceWorker';

// App-specific
import { homepage } from '../package.json';
import App from './App';
import './index.css';

// esri-loader
import { setDefaultOptions } from 'esri-loader';
setDefaultOptions({ version: 'next' });

// App runs at the root locally, but under /{homepage} in production
let basename;
process.env.NODE_ENV !== 'production' ? (basename = '') : (basename = homepage);

ReactDOM.render(
  <React.StrictMode>
    <CalciteThemeProvider>
      <BrowserRouter basename={basename}>
        <Route path="/" component={App} />
      </BrowserRouter>
    </CalciteThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
