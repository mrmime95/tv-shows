import React from 'react';
import Card from '../components/Card';
import { TVDB } from '../utils/constants';
import './searchResult.scss';

export default function SearchResult({ seriesArray = [] }) {
  return (
    <div className="search-result-container row">
      {seriesArray.map(series => (
        <Card
          key={series.id}
          linkTo={`/details/${series.id}`}
          title={series.seriesName}
          image={`${TVDB}${series.image}`}
          network={series.network}
          firstAired={series.firstAired}
          overview={series.overview || ''}
          className="col-12 col-md-6"
          withImage
        />
      ))}
    </div>
  );
}
