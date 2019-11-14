import {ActionCreator} from './reducer';
import {reducer} from './reducer';
import filmsMocks from '../mocks/films';

describe(`Reducer works correctly: `, () => {
  it(`if there is no parameters, should return initial state`, () => {
    expect(reducer(undefined, {type: null, payload: null})).toEqual({
      genre: `All genres`,
      films: filmsMocks,
      filmsCounter: 2,
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

  it(`action creator for getting films by selected genre returns correct action`, () => {
    expect(ActionCreator.getFilms(`Drama`)).toEqual({
      type: `GET_FILTERED_FILMS`,
      payload: filmsMocks.filter((film) => film.genre === `Drama`),
    });
  });

  it(`action creator for increasing counter returns correct action`, () => {
    expect(ActionCreator.increaseFilmsCounter()).toEqual({
      type: `INCREASE_FILMS_COUNTER`,
      payload: 2,
    });
  });

  it(`action creator for reseting counter returns correct action`, () => {
    expect(ActionCreator.resetFilmsCounter()).toEqual({
      type: `RESET_FILMS_COUNTER`,
      payload: 2,
    });
  });
});

