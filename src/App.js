import React from 'react';
import Card from './components/Card';
import RouteRenderer from './routes/RouteRenderer';

function App({ routerConfig }) {
  return (
    <div className="App">
      <RouteRenderer routerConfig={routerConfig} />
      <Card></Card>
    </div>
  );
}

export default App;
