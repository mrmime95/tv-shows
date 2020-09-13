import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { routerConfig } from './routes/routes';
import * as serviceWorker from './serviceWorker';
import './utils/custom.scss';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App routerConfig={routerConfig} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
