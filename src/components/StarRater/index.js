import React from 'react';
import Rater from 'react-rater';
import './starRater.scss';
export default function StarRater({ rating, total = 10 }) {
  return (
    <div className="star-rater">
      <Rater total={total} rating={rating} interactive={false} />
      <sub>({rating})</sub>
    </div>
  );
}
