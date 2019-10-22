import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const FilmCard = (props) => {
  const {film, onCardMouseEnter, onFilmTitleClick} = props;

  return <article
    className="small-movie-card catalog__movies-card"
    onMouseEnter={() => onCardMouseEnter(film)}
  >
    <div className="small-movie-card__image">
      <img
        src={film.src}
        alt={film.name}
        width="280"
        height="175"
      />
    </div>
    <h3 className="small-movie-card__title"
    >
      <Link
        to="/details"
        className="small-movie-card__link"
        onClick={() => onFilmTitleClick(film.id)}
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
  }).isRequired,
  onCardMouseEnter: PropTypes.func.isRequired,
  onFilmTitleClick: PropTypes.func.isRequired,
};

export default FilmCard;
