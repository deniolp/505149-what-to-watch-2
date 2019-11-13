import filmsMocks from './mocks/films';

const initialState = {
  genre: `allGenres`,
  films: filmsMocks,
};

const ActionCreator = {
  changeGenre: (selectedGenre) => ({
    type: `CHANGE_GENRE`,
    payload: selectedGenre,
  }),
  getFilms: (selectedGenre, films) => {
    const filteredFilms = films.filter((film) => film.genre === selectedGenre);

    return {
      type: `GET_FILTERED_FILMS`,
      payload: filteredFilms,
    };
  }
};

export {ActionCreator};
