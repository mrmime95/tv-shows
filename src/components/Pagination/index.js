import React from 'react';
import { range } from '../../utils/numbers';

export default function Pagination({ currentPage, onPreviousClick, onNextClick, onPageClick, allPage }) {
  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
        <button className="page-link" onClick={onPreviousClick}>
          Previous
        </button>
      </li>
      {range(1, allPage).map(season => {
        return (
          <li key={season} className={`page-item ${season === currentPage && 'active'}`}>
            <button className="page-link" onClick={() => onPageClick(season)}>
              {season}
            </button>
          </li>
        );
      })}
      <li className={`page-item ${currentPage === allPage && 'disabled'}`}>
        <button className="page-link" onClick={onNextClick}>
          Next
        </button>
      </li>
    </ul>
  );
}
