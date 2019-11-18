const initialState = {
  genre: `All genres`,
  films: [],
  comments: [],
  filmsCounter: 8,
  playingFilm: false,
};

const snakeToCamel = (word) => word.replace(/(_\w)/g, (matches) => matches[1].toUpperCase());

const normalizeKeys = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map((item) => normalizeKeys(item));
  }

  if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => Object.assign(acc, {
      [snakeToCamel(key)]: normalizeKeys(obj[key]),
    }), {});
  }

  return obj;
};

const ActionCreator = {
  loadFilms: (films) => ({
    type: `LOAD_FILMS`,
    payload: films,
  }),
  loadComments: (comments) => ({
    type: `LOAD_COMMENTS`,
    payload: comments,
  }),
  changeGenre: (selectedGenre) => ({
    type: `CHANGE_GENRE`,
    payload: selectedGenre,
  }),
  increaseFilmsCounter: () => ({
    type: `INCREASE_FILMS_COUNTER`,
    payload: 8,
  }),
  resetFilmsCounter: () => ({
    type: `RESET_FILMS_COUNTER`,
    payload: 8,
  }),
  setPlayingFilm: (film) => ({
    type: `SET_PLAYING_FILM`,
    payload: film,
  }),
};

const Operation = {
  loadFilms: () => (dispatch, _, api) => {
    return api.get(`films`)
      .then((response) => {
        const preparedData = response.data.map((item) => normalizeKeys(item));
        dispatch(ActionCreator.loadFilms(preparedData));
      });
  },
  loadComments: (id) => (dispatch, _, api) => {
    return api.get(`comments/${id}`)
      .then((response) => {
        const preparedData = response.data.map((item) => normalizeKeys(item));
        dispatch(ActionCreator.loadComments(preparedData));
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `LOAD_FILMS`: return Object.assign({}, state, {
      films: action.payload,
    });

    case `LOAD_COMMENTS`: return Object.assign({}, state, {
      comments: action.payload,
    });

    case `CHANGE_GENRE`: return Object.assign({}, state, {
      genre: action.payload,
    });

    case `INCREASE_FILMS_COUNTER`: return Object.assign({}, state, {
      filmsCounter: state.filmsCounter < state.films.length ? state.filmsCounter + action.payload : state.filmsCounter,
    });

    case `RESET_FILMS_COUNTER`: return Object.assign({}, state, {
      filmsCounter: action.payload,
    });

    case `SET_PLAYING_FILM`: return Object.assign({}, state, {
      playingFilm: action.payload,
    });
  }

  return state;
};

export {ActionCreator, reducer, Operation};
