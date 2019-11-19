import React from 'react';
import PropTypes from 'prop-types';

import ReviewsList from '../reviews-list/reviews-list';

const TabsBelowInfo = (props) => {
  const {film, label} = props;
  const getDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration - hours * 60;
    return `${hours}h ${minutes}m`;
  };

  const getRatingLevel = (rating) => {
    if (rating < 3) {
      return `Bad`;
    } else if (rating >= 3 && rating < 5) {
      return `Normal`;
    } else if (rating >= 5 && rating < 8) {
      return `Good`;
    } else if (rating >= 8 && rating < 10) {
      return `Very good`;
    } else if (rating === 10) {
      return `Awesome`;
    } else {
      return null;
    }
  };

  switch (label) {
    case `Overview`:
      return <React.Fragment>
        <div className="movie-rating">
          <div className="movie-rating__score">{film.rating}</div>
          <p className="movie-rating__meta">
            <span className="movie-rating__level">{getRatingLevel(film.rating)}</span>
            <span className="movie-rating__count">{film.scoresCount} ratings</span>
          </p>
        </div>

        <div className="movie-card__text">
          {film.description.split(`\n`).map((p, i) => {
            return <p key={film.name + ` p` + i}>{p}</p>;
          })}
          <p className="movie-card__director"><strong>Director: {film.director}</strong></p>
          <p className="movie-card__starring"><strong>Starring: {film.starring.join(`, `)} and other</strong></p>
        </div>
      </React.Fragment>;
    case `Details`:
      return <React.Fragment>
        <div className="movie-card__text movie-card__row">
          <div className="movie-card__text-col">
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Director</strong>
              <span className="movie-card__details-value">{film.director}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Starring</strong>
              <span className="movie-card__details-value">
                {film.starring.join(`, `)}
              </span>
            </p>
          </div>

          <div className="movie-card__text-col">
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Run Time</strong>
              <span className="movie-card__details-value">{getDuration(film.runTime)}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Genre</strong>
              <span className="movie-card__details-value">{film.genre}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Released</strong>
              <span className="movie-card__details-value">{film.released}</span>
            </p>
          </div>
        </div>
      </React.Fragment>;
    case `Reviews`:
      return <React.Fragment>
        <ReviewsList />
      </React.Fragment>;
    default:
      return null;
  }
};

TabsBelowInfo.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
    videoLink: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    scoresCount: PropTypes.number.isRequired,
    runTime: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    isFavorite: PropTypes.bool.isRequired,
  }),
  reviews: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  })),
  label: PropTypes.string.isRequired,
};

export default TabsBelowInfo;
