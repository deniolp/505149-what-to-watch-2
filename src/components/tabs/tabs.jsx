import React from 'react';
import PropTypes from 'prop-types';

const Tabs = (props) => {
  const {film} = props;
  return <div className="movie-card__desc">
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        <li className="movie-nav__item movie-nav__item--active">
          <a href="#" className="movie-nav__link">Overview</a>
        </li>
        <li className="movie-nav__item">
          <a href="#" className="movie-nav__link">Details</a>
        </li>
        <li className="movie-nav__item">
          <a href="#" className="movie-nav__link">Reviews</a>
        </li>
      </ul>
    </nav>

    <div className="movie-rating">
      <div className="movie-rating__score">{film.score}</div>
      <p className="movie-rating__meta">
        <span className="movie-rating__level">{film.ratingLevel}</span>
        <span className="movie-rating__count">{film.ratingCount} ratings</span>
      </p>
    </div>

    <div className="movie-card__text">
      {film.description.split(`\n`).map((p, i) => {
        return <p key={film.name + ` p` + i}>{p}</p>;
      })}
      <p className="movie-card__director"><strong>Director: {film.director}</strong></p>
      <p className="movie-card__starring"><strong>Starring: {film.starring.join(`, `)} and other</strong></p>
    </div>
  </div>;
};

Tabs.propTypes = {
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
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};

export default Tabs;
