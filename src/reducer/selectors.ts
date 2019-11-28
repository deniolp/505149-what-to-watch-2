import {createSelector} from 'reselect';

import {changeVideoUrl} from '../utils';

export const getFilms = (state) => {
  return state.films;
};

export const getFilmsWithChangedUrl = createSelector(
  getFilms,
  (films) => {
    return changeVideoUrl(films);
  }
);

export const getFavorites = (state) => {
  return state.favorites;
};

export const getFavoritesWithChangedUrl = createSelector(
  getFavorites,
  (films) => {
    return changeVideoUrl(films);
  }
);

export const getGenre = (state) => {
  return state.genre;
};

export const getpromo = (state) => {
  return state.promo;
};

export const getFilmsCounter = (state) => {
  return state.filmsCounter;
};

export const getPlayingFilm = (state) => {
  return state.playingFilm;
};

export const getIsAuthorizationRequired = (state) => {
  return state.isAuthorizationRequired;
};

export const getUser = (state) => {
  return state.user;
};

export const getError = (state) => {
  return state.error;
};

export const getIsReviewSending = (state) => {
  return state.isReviewSending;
};

export const getDidReviewSend = (state) => {
  return state.didReviewSend;
};

export const getReviews = (state) => {
  return state.comments;
};
