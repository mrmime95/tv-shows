import React from 'react';
import Rater from 'react-rater';
import { Link } from 'react-router-dom';
import './card.scss';
import Thumbnail from './Thumbnail';

export default function Card({ linkTo, title, image, firstAired, siteRating, network = [], overview, children }) {
  return (
    <div className="col-12 col-md-6">
      <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div className="col p-4 d-flex flex-column position-static">
          <h3 className="mb-0">{title}</h3>
          <div className="mb-1 text-muted">{firstAired}</div>
          <div className="overview-container">
            <p className="card-text mb-auto">{overview}</p>
          </div>
          <strong className="d-inline-block mb-2 text-primary">{network}</strong>
          {linkTo && <Link to={linkTo} className="stretched-link"></Link>}
          {siteRating && (
            <div className="site-rating">
              <Rater total={10} rating={siteRating} interactive={false} />
              <sub>({siteRating})</sub>
            </div>
          )}
          {children && <div>{children}</div>}
        </div>
        {image && (
          <div className="card-image-container col-auto d-none d-md-block">
            <img className="card-image" src={image} alt={title} />
            <Thumbnail />
          </div>
        )}
      </div>
    </div>
  );
}
