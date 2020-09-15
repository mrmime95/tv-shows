import React from 'react';
import { Link } from 'react-router-dom';
import './card.scss';
import Thumbnail from './Thumbnail';

export default function Card({ linkTo, title, image, firstAired, network = [], overview, noImage = false }) {
  return (
    <div>
      <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div className="col p-4 d-flex flex-column position-static">
          <h3 className="mb-0">{title}</h3>
          <div className="mb-1 text-muted">{firstAired}</div>
          <p className="card-text mb-auto">{overview}</p>
          <div>
            {network.map(({ id }) => (
              <strong key={id} className="d-inline-block mb-2 text-primary">
                World
              </strong>
            ))}
          </div>
          {linkTo && <Link to={linkTo} className="stretched-link"></Link>}
        </div>
        {!noImage && <div className="col-auto d-none d-md-block">{image ? <img src={image} alt={title} /> : <Thumbnail />}</div>}
      </div>
    </div>
  );
}
