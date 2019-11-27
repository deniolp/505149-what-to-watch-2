import * as React from 'react';

import FilmCard from '../film-card/film-card';
import withIsPreviewPlaying from '../../hocs/with-is-preview-playing/with-is-preview-playing';

import {Film} from "../../types";

interface Props {
  films: Film[];
  filmsCounter: number;
  activeGenre: string;
}

const FilmCardWrapped = withIsPreviewPlaying(FilmCard);

const FilmsList = (props: Props) => {
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

export default React.memo(FilmsList);
