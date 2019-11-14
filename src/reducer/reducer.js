import filmsMocks from '../mocks/films';

const initialState = {
  genre: `All genres`,
  films: filmsMocks,
  filmsCounter: 2,
};

const ActionCreator = {
  changeGenre: (selectedGenre) => ({
    type: `CHANGE_GENRE`,
    payload: selectedGenre,
  }),
  getFilms: (selectedGenre) => {
    const filteredFilms = selectedGenre === `All genres` ? initialState.films : initialState.films.filter((film) => film.genre === selectedGenre);

    return {
      type: `GET_FILTERED_FILMS`,
      payload: filteredFilms,
    };
  },
  increaseFilmsCounter: () => ({
    type: `INCREASE_FILMS_COUNTER`,
    payload: 2,
  }),
  resetFilmsCounter: () => ({
    type: `RESET_FILMS_COUNTER`,
    payload: 2,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CHANGE_GENRE`: return Object.assign({}, state, {
      genre: action.payload,
    });

    case `GET_FILTERED_FILMS`: return Object.assign({}, state, {
      films: action.payload,
    });

    case `INCREASE_FILMS_COUNTER`: return Object.assign({}, state, {
      filmsCounter: state.filmsCounter < state.films.length ? state.filmsCounter + action.payload : state.filmsCounter,
    });

    case `RESET_FILMS_COUNTER`: return Object.assign({}, state, {
      filmsCounter: action.payload,
    });
  }

  return state;
};

export {ActionCreator, reducer};
