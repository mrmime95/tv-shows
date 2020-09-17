import React, { useEffect, Suspense } from 'react';
import RouteRenderer from './routes/RouteRenderer';

import Navbar from './components/Navbar';
import api from './utils/api';
import Loading from './components/Loading';

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
        <Suspense fallback={<Loading />}>
          <RouteRenderer routerConfig={routerConfig} />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
