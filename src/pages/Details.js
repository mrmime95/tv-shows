import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
/* import { WithContext as ReactTags } from 'react-tag-input'; */

import Card from '../components/Card';
import ModalControl from '../components/Modal/ModalControl';
import api from '../utils/api';
import { TVDB } from '../utils/constants';
import { range } from '../utils/numbers';

import './details.scss';

export default function Details() {
  const [currentSeason, setCurrentSeason] = useState(1);
  const [series, setSeries] = useState();
  const [episodes, setEpisodes] = useState([]);
  const [episodesPage, setEpisodesPage] = useState(1);
  let { id: seriesId } = useParams();

  const allSeasons = series && Number(series.season);

  useEffect(() => {
    api.series.getSeries(seriesId).then(data => {
      setSeries(data.data);
    });
  }, [seriesId]);

  useEffect(() => {
    api.series.getEpisodes({ id: seriesId, page: episodesPage }).then(data => {
      setEpisodes(stateEpisodes => [...stateEpisodes, ...data.data]);
      data.links.next && setEpisodesPage(data.links.next);
    });
  }, [episodesPage, seriesId]);
  return (
    <div>
      {series ? (
        <>
          <div className="row jumbotron">
            <div className="col-12 col-lg-9 description">
              <h2 className="title">{series.seriesName}</h2>
              <div className="overview">{series.overview}</div>
              <div className="status">
                <span>
                  Still running: <span>{series.status === 'Ended' ? 'X' : 'Y'}</span>
                </span>
              </div>
              <div className="air-days-of-week">{series.airsDayOfWeek}</div>
              <div className="airs-time">{series.airsTime}</div>
              <div className="site-rating">
                <Rater total={10} rating={series.siteRating} interactive={false} />
                <sub>({series.siteRating})</sub>
              </div>
              <div className="genre">
                {/* <ReactTags tags={series.genre} suggestions={series.genre} readOnly handleDrag={() => {}} /> */}
              </div>
            </div>
            {series.poster && <img className="col-12 col-lg-3" src={`${TVDB}/banners/${series.poster}`} alt={series.seriesName} />}
          </div>

          <div className="seasons-list">
            <h5>Seasons: </h5>
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
          </div>

          <div className="episode-cards">
            {episodes
              .filter(episode => episode.airedSeason === currentSeason)
              .map(episode => (
                <>
                  <Card
                    key={episode.id}
                    title={`S${episode.airedSeason}E${episode.airedEpisodeNumber} ${episode.episodeName}`}
                    firstAired={episode.firstAired}
                    siteRating={episode.siteRating}
                    image={`${TVDB}/${episode.filename}`}
                  >
                    <ModalControl
                      content={() => (
                        <div>
                          <h5>{`S${episode.airedSeason}E${episode.airedEpisodeNumber} ${episode.episodeName}`}</h5>
                          <h6>
                            Directed by:
                            {episode.directors.map((director, index) => (
                              <span>
                                {director}
                                {index < episode.directors.length - 1 && ', '}
                              </span>
                            ))}
                          </h6>
                          <img className="card-image" src={`${TVDB}/${episode.filename}`} alt={episode.episodeName} />
                          <p>{episode.overview}</p>
                        </div>
                      )}
                    >
                      <button>This button opens the Modal</button>
                    </ModalControl>
                  </Card>
                </>
              ))}
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
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
