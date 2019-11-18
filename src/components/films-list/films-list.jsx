import React from 'react';
import PropTypes from 'prop-types';

import FilmCard from '../film-card/film-card';
import withIsPreviewPlaying from '../../hocs/with-is-preview-playing/with-is-preview-playing';

const FilmCardWrapped = withIsPreviewPlaying(FilmCard);

const FilmsList = (props) => {
  const {films, filmsCounter, activeGenre} = props;
  let filteredFilms;
  let moviesToShow;
  if (activeGenre) {
    filteredFilms = activeGenre === `All genres` ? films : films.filter((film) => film.genre === activeGenre);
    moviesToShow = filteredFilms.slice(0, filmsCounter);
  } else {
    filteredFilms = films;
    moviesToShow = filteredFilms.slice(0, 4);
  }

  return moviesToShow.map((film) => {
    return <FilmCardWrapped
      key={film.id}
      film={film}
    />;
  });
};

FilmsList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
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
  })),
  filmsCounter: PropTypes.number.isRequired,
  activeGenre: PropTypes.string,
};

export default FilmsList;
