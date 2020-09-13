import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

/**
 * Renders routes based on a given route config.
 * @param {Route[]} routes
 */
function RouteRenderer({ routerConfig, ...props }) {
  return <Switch {...props}>{createElements(routerConfig)}</Switch>;
}

function createElement(route) {
  if (route.redirect) {
    return (
      <Redirect key={route.name} from={route.path} to={route.redirect} exact />
    );
  }

  return (
    <Route
      key={route.name}
      path={route.path}
      exact={route.exact}
      component={route.component}
    />
  );
}

function createElements(routerConfig) {
  const elements = [];

  for (let i = 0; i < routerConfig.length; i++) {
    elements.push(createElement(routerConfig[i]));

    if (routerConfig[i].routes) {
      elements.push(...createElements(routerConfig[i].routes));
    }
  }

  console.log({ elements });
  return elements;
}

export default RouteRenderer;
