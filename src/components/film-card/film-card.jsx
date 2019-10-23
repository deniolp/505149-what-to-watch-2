import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const FilmCard = (props) => {
  const {film, onCardMouseEnter, onFilmTitleClick} = props;

  return <article
    className="small-movie-card catalog__movies-card"
    onMouseEnter={() => onCardMouseEnter(film)}
  >
    <Link to={`/film/${film.id}`}><div className="small-movie-card__image">
      <img
        src={film.src}
        alt={film.name}
        width="280"
        height="175"
      />
    </div></Link>
    <h3 className="small-movie-card__title"
    >
      <Link
        to={`/film/${film.id}`}
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
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    ratingLevel: PropTypes.string.isRequired,
    ratingCount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onCardMouseEnter: PropTypes.func.isRequired,
  onFilmTitleClick: PropTypes.func.isRequired,
};

export default FilmCard;
