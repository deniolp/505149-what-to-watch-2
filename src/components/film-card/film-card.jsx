import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import VideoPlayer from '../video-player/video-player';

const FilmCard = (props) => {
  const {film, isPreviewPlaying, setIsPreviewPlaying} = props;

  let timerId;
  const cardMouseEnterHandler = () => setIsPreviewPlaying(true);
  const clearTimer = () => timerId && clearTimeout(timerId);

  return <article
    className="small-movie-card catalog__movies-card"
    onMouseEnter={() => {
      timerId = setTimeout(cardMouseEnterHandler, 1000);
    }}
    onMouseLeave={() => {
      clearTimer();
      setIsPreviewPlaying(false);
    }}
  >
    <Link
      to={`/film/${film.id}`}
      onClick={() => clearTimer()}
    >
      <div className="small-movie-card__image">
        <VideoPlayer
          preview={film.previewVideoLink}
          poster={film.posterImage}
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
    posterImage: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    scoresCount: PropTypes.number.isRequired,
    runTime: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    isFavorite: PropTypes.bool.isRequired,
    reviews: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })),
  }),
  isPreviewPlaying: PropTypes.bool.isRequired,
  setIsPreviewPlaying: PropTypes.func.isRequired,
};

export default FilmCard;
