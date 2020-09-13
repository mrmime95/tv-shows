import React from 'react';

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
    component: () => <div>Search</div>,
    exact: true,
    routes: [
      {
        name: 'SearchResults',
        path: routes.searchResult,
        component: () => <div>SearchResults</div>,
      },
    ],
  },
  {
    name: 'Details',
    path: routes.details,
    component: () => <div>Details</div>,
  },
  {
    name: 'NotFound',
    path: routes.notFound,
    component: () => <div>NotFound</div>,
  },
];
