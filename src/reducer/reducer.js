const initialState = {
  genre: `All genres`,
  films: [],
  promo: {},
  comments: [],
  filmsCounter: 8,
  playingFilm: false,
  isAuthorizationRequired: false,
  user: {},
  favorites: [],
  isReviewSending: false,
  didReviewSend: false,
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

const changeFilm = (films, newFilm) => {
  return films.map((item) => {
    return item.id === newFilm.id ? newFilm : item;
  });
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
  updatePromo: (film) => ({
    type: `UPDATE_PROMO`,
    payload: film,
  }),
  loadComments: (comments) => ({
    type: `LOAD_COMMENTS`,
    payload: comments,
  }),
  loadFavorites: (favorites) => ({
    type: `LOAD_FAVORITES`,
    payload: favorites,
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
  blockForm: (bool) => ({
    type: `BLOCK_FORM`,
    payload: bool,
  }),
  cleanForm: (bool) => ({
    type: `CLEAN_FORM`,
    payload: bool,
  }),
  addToFavorites: (film) => ({
    type: `ADD_TO_FAVORITES`,
    payload: film,
  }),
  deleteFromFavorites: (film) => ({
    type: `DELETE_FROM_FAVORITES`,
    payload: film,
  }),
};

const Operation = {
  loadFilms: () => (dispatch, _, api) => {
    return api.get(`films`)
      .then((response) => {
        const preparedData = response.data.map((item) => normalizeKeys(item));
        dispatch(ActionCreator.loadFilms(preparedData));
      })
      .catch((_err) => {});
  },
  loadPromoFilm: () => (dispatch, _, api) => {
    return api.get(`films/promo`)
      .then((response) => {
        const preparedData = normalizeKeys(response.data);
        dispatch(ActionCreator.loadPromo(preparedData));
      })
      .catch((_err) => {});
  },
  loadComments: (id) => (dispatch, _, api) => {
    return api.get(`comments/${id}`)
      .then((response) => {
        const preparedData = response.data.map((item) => normalizeKeys(item));
        dispatch(ActionCreator.loadComments(preparedData));
      })
      .catch((_err) => {});
  },
  loadFavorites: () => (dispatch, _, api) => {
    return api.get(`favorite`)
      .then((response) => {
        const preparedData = response.data.map((item) => normalizeKeys(item));
        dispatch(ActionCreator.loadFavorites(preparedData));
      })
      .catch((_err) => {});
  },
  postFavorite: (id, isFavorite, isPromo) => (dispatch, _, api) => {
    const status = isFavorite ? 0 : 1;
    return api.post(`favorite/${id}/${status}`)
      .then((response) => {
        const preparedData = normalizeKeys(response.data);
        if (isPromo) {
          dispatch(ActionCreator.updatePromo(preparedData));
        }
        return status ? dispatch(ActionCreator.addToFavorites(preparedData)) : dispatch(ActionCreator.deleteFromFavorites(preparedData));
      })
      .catch((_err) => {});
  },
  checkIsLogin: () => (dispatch, _, api) => {
    return api.get(`login`)
      .then((response) => {
        if (response.data) {
          dispatch(ActionCreator.authorizeUser(response.data));
        } else {
          dispatch(ActionCreator.authorizeUser({}));
          dispatch(ActionCreator.changeIsAuthorizationRequired(true));
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
  postReview: (review, id) => (dispatch, _, api) => {
    return api.post(`comments/${id}`, review)
      .then((response) => {
        if (response.data) {
          const preparedData = response.data.map((item) => normalizeKeys(item));
          dispatch(ActionCreator.loadComments(preparedData));
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

    case `UPDATE_PROMO`: return Object.assign({}, state, {
      promo: action.payload,
    });

    case `LOAD_COMMENTS`: return Object.assign({}, state, {
      comments: action.payload,
    });

    case `LOAD_FAVORITES`: return Object.assign({}, state, {
      favorites: action.payload,
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

    case `BLOCK_FORM`: return Object.assign({}, state, {
      isReviewSending: action.payload,
    });

    case `CLEAN_FORM`: return Object.assign({}, state, {
      didReviewSend: action.payload,
    });

    case `ADD_TO_FAVORITES`: return Object.assign({}, state, {
      films: changeFilm(state.films, action.payload),
    });

    case `DELETE_FROM_FAVORITES`: return Object.assign({}, state, {
      films: changeFilm(state.films, action.payload),
    });
  }

  return state;
};

export {ActionCreator, reducer, Operation};
