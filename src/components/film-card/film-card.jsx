import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import VideoPlayer from '../video-player/video-player';

const FilmCard = (props) => {
  const {film, onCardMouseEnter, onCardMouseLeave, isPreviewPlaying} = props;
  const cardMouseEnterHandler = () => onCardMouseEnter(true);
  let timerId;
  const clearTimer = () => timerId && clearTimeout(timerId);

  return <article
    className="small-movie-card catalog__movies-card"
    onMouseEnter={() => {
      timerId = setTimeout(cardMouseEnterHandler, 1000);
    }}
    onMouseLeave={() => {
      clearTimeout(timerId);
      onCardMouseLeave(false);
    }}
  >
    <Link
      to={`/film/${film.id}`}
      onClick={() => clearTimer()}
    >
      <div className="small-movie-card__image">
        <VideoPlayer
          preview={film.preview}
          poster={film.src}
          isPreviewPlaying={isPreviewPlaying}
        >
        </VideoPlayer>
      </div>
    </Link>
    <h3 className="small-movie-card__title">
      <Link
        to={`/film/${film.id}`}
        onClick={() => clearTimer()}
        className="small-movie-card__link"
      >
        {film.name}
      </Link>
    </h3>
  </article>;
};

FilmCard.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    ratingLevel: PropTypes.string.isRequired,
    ratingCount: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    reviews: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })),
  }).isRequired,
  onCardMouseEnter: PropTypes.func.isRequired,
  onCardMouseLeave: PropTypes.func.isRequired,
  isPreviewPlaying: PropTypes.bool.isRequired,
};

export default FilmCard;
