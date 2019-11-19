const initialState = {
  genre: `All genres`,
  films: [],
  promo: {},
  comments: [],
  filmsCounter: 8,
  playingFilm: false,
  isAuthorizationRequired: false,
  user: {},
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
  loadPromo: (film) => ({
    type: `LOAD_PROMO`,
    payload: film,
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
  changeIsAuthorizationRequired: (bool) => ({
    type: `CHANGE_IS_AUTHORIZATION_REQUIRED`,
    payload: bool,
  }),
  authorizeUser: (user) => ({
    type: `AUTHORIZE_USER`,
    payload: normalizeKeys(user),
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
  loadPromoFilm: () => (dispatch, _, api) => {
    return api.get(`films/promo`)
      .then((response) => {
        const preparedData = normalizeKeys(response.data);
        dispatch(ActionCreator.loadPromo(preparedData));
      });
  },
  loadComments: (id) => (dispatch, _, api) => {
    return api.get(`comments/${id}`)
      .then((response) => {
        const preparedData = response.data.map((item) => normalizeKeys(item));
        dispatch(ActionCreator.loadComments(preparedData));
      });
  },
  checkIsLogin: () => (dispatch, _, api) => {
    return api.get(`login`)
      .then((response) => {
        if (response.data) {
          dispatch(ActionCreator.authorizeUser(response.data));
        } else {
          dispatch(ActionCreator.authorizeUser({}));
        }
      })
      .catch((_err) => {});
  },
  logIn: (email, password) => (dispatch, _, api) => {
    return api.post(`login`, {email, password})
      .then((response) => {
        if (response.data) {
          dispatch(ActionCreator.changeIsAuthorizationRequired(false));
          dispatch(ActionCreator.authorizeUser(response.data));
        }
      })
      .catch((_err) => {});
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `LOAD_FILMS`: return Object.assign({}, state, {
      films: action.payload,
    });

    case `LOAD_PROMO`: return Object.assign({}, state, {
      promo: action.payload,
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

    case `CHANGE_IS_AUTHORIZATION_REQUIRED`: return Object.assign({}, state, {
      isAuthorizationRequired: action.payload,
    });

    case `AUTHORIZE_USER`: return Object.assign({}, state, {
      user: action.payload,
    });
  }

  return state;
};

export {ActionCreator, reducer, Operation};
