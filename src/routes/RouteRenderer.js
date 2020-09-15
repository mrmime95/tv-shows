import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

/**
 * Renders routes based on a given route config.
 * @param {Route[]} routes
 */
function RouteRenderer({ routerConfig, ...props }) {
  return <Switch {...props}>{createRouteElements(routerConfig)}</Switch>;
}

export function createRouteElement(route) {
  if (route.redirect) {
    return <Redirect key={route.name} from={route.path} to={route.redirect} exact />;
  }

  return <Route key={route.name} path={route.path} exact={route.exact} component={route.component} />;
}

function createRouteElements(routerConfig) {
  const elements = [];

  for (let i = 0; i < routerConfig.length; i++) {
    elements.push(createRouteElement(routerConfig[i]));

    if (routerConfig[i].routes) {
      elements.push(...createRouteElements(routerConfig[i].routes));
    }
  }

  return elements;
}

export default RouteRenderer;
