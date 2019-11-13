import React from 'react';
import PropTypes from 'prop-types';

import FilmCard from '../film-card/film-card';

const FilmsList = (props) => {
  const {films} = props;
  return films.map((film) => {
    return <FilmCard
      key={film.id}
      film={film}
    />;
  });
};

FilmsList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
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
  })),
  reviews: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  })),
};

export default FilmsList;
