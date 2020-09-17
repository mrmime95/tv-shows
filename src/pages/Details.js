import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'react-rater/lib/react-rater.css';
/* import { WithContext as ReactTags } from 'react-tag-input'; */

import Card from '../components/Card';
import ModalControl from '../components/Modal/ModalControl';
import api from '../utils/api';
import { TVDB } from '../utils/constants';

import './details.scss';
import NotMark from '../components/icons/NotMark';
import CheckMark from '../components/icons/CheckMark';
import StarRater from '../components/StarRater';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import Tags from '../components/Tags';

export default function Details() {
  const [currentSeason, setCurrentSeason] = useState(1);
  const [series, setSeries] = useState();
  const [episodes, setEpisodes] = useState([]);
  const [episodesPage, setEpisodesPage] = useState(1);
  const [posterExists, setPosterExists] = useState(false);
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
    <div className="details">
      {series ? (
        <>
          <div className="season-header row jumbotron">
            <div className="col-12 col-lg-9 details-description">
              <div className="details-description__header">
                <div className="desctiption__title-rating">
                  <h2 className="title">{series.seriesName}</h2>
                  <StarRater total={10} rating={series.siteRating} />
                </div>
                <div className="details-description__air-status">
                  <div className="details-description__air">
                    {series.airsDayOfWeek} =&gt; {series.airsTime}
                  </div>
                  <div className="status">
                    <span>
                      Still running: <span>{series.status === 'Ended' ? <NotMark /> : <CheckMark />}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="overview">
                <h6>Description:</h6>
                <p>{series.overview}</p>
              </div>

              <div className="genre">
                <Tags tags={series.genre} />
              </div>
            </div>
            {series.poster && (
              <img
                className={`details-poster col-6 col-lg-3 ${!posterExists && 'd-none'}`}
                onLoad={() => setPosterExists(true)}
                onError={() => setPosterExists(false)}
                src={`${TVDB}/banners/${series.poster}`}
                alt={series.seriesName}
              />
            )}
          </div>

          <div className="seasons-list">
            <h5>Seasons: </h5>
            <Pagination
              currentPage={currentSeason}
              onPreviousClick={handlePreviousClick}
              onNextClick={handleNextClick}
              onPageClick={handleSeasonClick}
              allPage={allSeasons}
            />
          </div>

          <div className="episode-cards row">
            {episodes
              .filter(episode => episode.airedSeason === currentSeason)
              .map(episode => {
                return (
                  <Card
                    key={episode.id}
                    title={`S${episode.airedSeason}E${episode.airedEpisodeNumber} ${episode.episodeName}`}
                    firstAired={episode.firstAired}
                    siteRating={episode.siteRating}
                    image={`${TVDB}/${episode.filename}`}
                    className="col-12 col-md-6 col-lg-4"
                  >
                    <ModalControl
                      content={() => {
                        let modalWithImage = false;
                        return (
                          <div className="episode-modal">
                            <div className="episode-modal__header ">
                              <div className="episode-modal__header-text">
                                <h5>{`S${episode.airedSeason}E${episode.airedEpisodeNumber} ${episode.episodeName}`}</h5>
                                <h6>
                                  Directed by:
                                  {episode.directors.map((director, index) => (
                                    <span key={director}>
                                      {director}
                                      {index < episode.directors.length - 1 && ', '}
                                    </span>
                                  ))}
                                </h6>
                              </div>
                              <div className={`episode-modal__header-image__container ${!modalWithImage && 'd-none'}`}>
                                <img
                                  className="episode-modal__header-image"
                                  onLoad={() => (modalWithImage = true)}
                                  onError={() => (modalWithImage = false)}
                                  src={`${TVDB}/${episode.filename}`}
                                  alt={episode.episodeName}
                                />
                              </div>
                            </div>
                            <p className="m-0">{episode.overview}</p>
                          </div>
                        );
                      }}
                    >
                      <button type="button" className="btn btn-outline-primary modal-opener btn-sm">
                        More details
                      </button>
                    </ModalControl>
                  </Card>
                );
              })}
          </div>
        </>
      ) : (
        <Loading />
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
