import React from 'react';
import PropTypes from 'prop-types';

const FilmCard = (props) => {
  const {film, onCardHover} = props;

  return <article
    className="small-movie-card catalog__movies-card"
    onMouseEnter={() => onCardHover(film)}
  >
    <div className="small-movie-card__image">
      <img
        src={film.src}
        alt="Shutter Island"
        width="280"
        height="175"
      />
    </div>
    <h3 className="small-movie-card__title"
    >
      <a
        className="small-movie-card__link"
        href="movie-page.html"
      >
        {film.name}
      </a>
    </h3>
  </article>;
};

FilmCard.propTypes = {
  film: PropTypes.shape({
    name: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
  onCardHover: PropTypes.func.isRequired,
};

export default FilmCard;
