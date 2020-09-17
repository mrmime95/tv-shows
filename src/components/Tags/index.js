import React from 'react';
import './tags.scss';

export default function Tags({ tags }) {
  return (
    <div className="tags">
      {tags.map(tag => (
        <span className="tag btn-primary mr-2 p-1">{tag}</span>
      ))}
    </div>
  );
}
