import {createSelector} from 'reselect';

import {changeVideoUrl} from '../utils';
import {Film, User, Review} from '../types';

export const getFilms = (state): Film[] => {
  return state.films;
};

export const getFilmsWithChangedUrl = createSelector(
    getFilms,
    (films) => {
      return changeVideoUrl(films);
    }
);

export const getFavorites = (state): Film[] => {
  return state.favorites;
};

export const getFavoritesWithChangedUrl = createSelector(
    getFavorites,
    (films) => {
      return changeVideoUrl(films);
    }
);

export const getGenre = (state): string => {
  return state.genre;
};

export const getpromo = (state): Film => {
  return state.promo;
};

export const getFilmsCounter = (state): number => {
  return state.filmsCounter;
};

export const getPlayingFilm = (state): Film => {
  return state.playingFilm;
};

export const getIsAuthorizationRequired = (state): boolean => {
  return state.isAuthorizationRequired;
};

export const getUser = (state): User => {
  return state.user;
};

export const getError = (state): string => {
  return state.error;
};

export const getIsReviewSending = (state): boolean => {
  return state.isReviewSending;
};

export const getDidReviewSend = (state): boolean => {
  return state.didReviewSend;
};

export const getReviews = (state): Review[] => {
  return state.comments;
};
