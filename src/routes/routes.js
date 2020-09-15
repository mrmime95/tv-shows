import { lazy } from 'react';

export const routes = {
  home: '/',
  search: '/search',
  searchResult: '/search/results',
  details: '/details/:id',
  notFound: '*',
};

export const routerConfig = [
  {
    name: 'Home',
    path: routes.home,
    exact: true,
    redirect: routes.search,
  },
  {
    name: 'Search',
    path: routes.search,
    component: lazy(() => import('../pages/Search')),
  },
  {
    name: 'Details',
    path: routes.details,
    component: lazy(() => import('../pages/Details')),
  },
  {
    name: 'NotFound',
    path: routes.notFound,
    component: lazy(() => import('../pages/NotFound')),
  },
];

export const searchResultRoute = {
  name: 'SearchResult',
  path: routes.searchResult,
  component: lazy(() => import('../pages/SearchResult')),
};
