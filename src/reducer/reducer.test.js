import MockAdapter from 'axios-mock-adapter';

import createAPI, {api} from '../api';
import {ActionCreator, reducer, Operation} from './reducer';
import filmsMocks from '../mocks/films';

describe(`Reducer works correctly: `, () => {
  it(`if there is no parameters, should return initial state`, () => {
    expect(reducer(undefined, {type: null, payload: null})).toEqual({
      genre: `All genres`,
      films: [],
      comments: [],
      filmsCounter: 8,
      playingFilm: false,
    });
  });
});

describe(`Action creators works correctly: `, () => {
  it(`action creator for changing genre returns correct action`, () => {
    expect(ActionCreator.changeGenre(`Drama`)).toEqual({
      type: `CHANGE_GENRE`,
      payload: `Drama`,
    });
  });

  it(`action creator for increasing counter returns correct action`, () => {
    expect(ActionCreator.increaseFilmsCounter()).toEqual({
      type: `INCREASE_FILMS_COUNTER`,
      payload: 8,
    });
  });

  it(`action creator for reseting counter returns correct action`, () => {
    expect(ActionCreator.resetFilmsCounter()).toEqual({
      type: `RESET_FILMS_COUNTER`,
      payload: 8,
    });
  });

  it(`action creator for setting film returns correct film`, () => {
    expect(ActionCreator.setPlayingFilm(filmsMocks[0])).toEqual({
      type: `SET_PLAYING_FILM`,
      payload: filmsMocks[0],
    });
  });

  it(`should make correct API call to /films`, () => {
    const apiMock = new MockAdapter(createAPI());
    const dispatch = jest.fn();
    const filmsLoader = Operation.loadFilms();

    apiMock
      .onGet(`/films`)
      .reply(200, [{fake: true}]);

    return filmsLoader(dispatch, {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: `LOAD_FILMS`,
          payload: [{fake: true}],
        });
      });
  });

  it(`should make correct API call to /comments/1`, () => {
    const apiMock = new MockAdapter(createAPI());
    const dispatch = jest.fn();
    const commentsLoader = Operation.loadComments(1);

    apiMock
      .onGet(`/comments/1`)
      .reply(200, [{comment: `true`}, {comment: `alsoTrue`}]);

    return commentsLoader(dispatch, {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: `LOAD_COMMENTS`,
          payload: [{comment: `true`}, {comment: `alsoTrue`}],
        });
      });
  });
});

