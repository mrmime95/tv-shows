import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SearchComponent from '../components/Search';
import { createRouteElement } from '../routes/RouteRenderer';
import { routes, searchResultRoute } from '../routes/routes';
import SearchResult from '../pages/SearchResult';
import api from '../utils/api';

export default function Search() {
  const [seriesArray, setSeriesArray] = useState([]);
  let history = useHistory();

  return (
    <div>
      <SearchComponent onSearch={handleSearch} />
      {createRouteElement(searchResultRoute, () => (
        <SearchResult seriesArray={seriesArray} />
      ))}
    </div>
  );

  function handleSearch(searchValue) {
    console.log({ searchValue });
    api.series.search({ name: searchValue }).then(data => setSeriesArray(data.data));
    history.push(routes.searchResult);
  }
}
