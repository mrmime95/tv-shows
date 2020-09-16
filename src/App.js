import React, { useEffect, Suspense } from 'react';
import RouteRenderer from './routes/RouteRenderer';

import Navbar from './components/Navbar';
import api from './utils/api';

function App({ routerConfig }) {
  useEffect(() => {
    api.login().then(data => {
      localStorage.setItem('token', data.token);
    });
  }, []);

  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <Suspense fallback={<div>Loading...</div>}>
          <RouteRenderer routerConfig={routerConfig} />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
