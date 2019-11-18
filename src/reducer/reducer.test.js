import {ActionCreator} from './reducer';
import {reducer} from './reducer';
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
});

