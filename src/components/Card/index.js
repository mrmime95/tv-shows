import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StarRater from '../StarRater';
import './card.scss';
import Thumbnail from './Thumbnail';

export default function Card({
  linkTo,
  title,
  image,
  firstAired,
  siteRating,
  network = [],
  overview,
  withImage = false,
  children,
  ...props
}) {
  const [goodImage, setGoodImage] = useState(false);
  return (
    <div {...props}>
      <div className="card-component row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div className="card-texts col p-4 d-flex flex-column">
          <h4 className="card-title mb-0">{title}</h4>
          <div className="mb-1 text-muted">{firstAired}</div>
          {overview !== undefined && (
            <div className="overview-container">
              <p className="card-text mb-auto">{overview}</p>
            </div>
          )}
          <strong className="d-inline-block mb-2 text-primary">{network}</strong>
          {siteRating && <StarRater total={10} rating={siteRating} />}
          {children && <div className="card-children-container">{children}</div>}
        </div>
        {image && (
          <div className={`card-image-container col-auto ${goodImage || withImage ? 'd-block' : 'd-none'}`}>
            <img className="card-image" src={image} onLoad={() => setGoodImage(true)} onError={() => setGoodImage(false)} alt={title} />
            <Thumbnail />
          </div>
        )}
        {linkTo && <Link to={linkTo} className="stretched-link"></Link>}
      </div>
    </div>
  );
}
