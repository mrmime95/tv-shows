import React, { useState } from 'react';
import Card from '../components/Card';
import ModalControl from '../components/Modal/ModalControl';
import { range } from '../utils/numbers';

export default function Details() {
  const [currentSeason, setCurrentSeason] = useState(1);
  const image = false;
  const name = 'Friends';
  const allSeasons = 10;

  return (
    <div>
      <div className="jumbotron">
        <div>
          <h2>{name}</h2>
          <div>
            {image && <img src={image} alt={name} />}
            <div>overview</div>
            <ModalControl title="Modal title" content={() => <p>This is the content inside a modal</p>}>
              <button>This button opens the Modal</button>
            </ModalControl>
          </div>
        </div>
      </div>

      <ul className="pagination">
        <li className={`page-item ${currentSeason === 1 && 'disabled'}`}>
          <button className="page-link" onClick={handlePreviousClick}>
            Previous
          </button>
        </li>
        {range(1, allSeasons).map(season => {
          return (
            <li key={season} className={`page-item ${season === currentSeason && 'active'}`}>
              <button className="page-link" onClick={() => handleSeasonClick(season)}>
                {season}
              </button>
            </li>
          );
        })}
        <li className={`page-item ${currentSeason === allSeasons && 'disabled'}`}>
          <button className="page-link" onClick={handleNextClick}>
            Next
          </button>
        </li>
      </ul>

      <div className="episode-cards">
        <Card
          title="Friends"
          firstAired="22-22-2222"
          overview="Est velit enim qui culpa consectetur. Labore irure consequat aute nisi Lorem do fugiat et. Enim sit reprehenderit id adipisicing ad do consequat laboris nulla voluptate adipisicing anim quis exercitation. Minim enim dolor adipisicing ullamco ipsum quis. Culpa aute tempor velit magna. Tempor minim veniam commodo fugiat Lorem excepteur cupidatat Lorem officia."
        />
      </div>
    </div>
  );

  function handlePreviousClick() {
    if (currentSeason > 1) {
      setCurrentSeason(s => --s);
    }
  }
  function handleNextClick() {
    if (currentSeason < allSeasons) {
      setCurrentSeason(s => ++s);
    }
  }
  function handleSeasonClick(season) {
    setCurrentSeason(season);
  }
}
