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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CHANGE_GENRE`: return Object.assign({}, state, {
      genre: action.payload,
    });

    case `GET_FILTERED_FILMS`: return Object.assign({}, state, {
      films: action.payload,
    });
  }

  return state;
};

export {ActionCreator, reducer};
