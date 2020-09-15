import React from 'react';
import { useHistory } from 'react-router-dom';
import SearchComponent from '../components/Search';
import { createRouteElement } from '../routes/RouteRenderer';
import { routes, searchResultRoute } from '../routes/routes';

export default function Search() {
  let history = useHistory();

  return (
    <div>
      <SearchComponent onSearch={handleSearch} />
      {createRouteElement(searchResultRoute)}
    </div>
  );

  function handleSearch(searchValue) {
    console.log({ searchValue });
    history.push(routes.searchResult);
  }
}
