import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import MainPage from './main-page';
import filmsListMock from '../../mocks/films';

describe(`MainPage`, () => {
  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
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
  const store = mockStore(initialState);
  const filmsMock = filmsListMock.slice(0, 2);
  const genresSet = new Set().add(`All genres`);
  filmsListMock.forEach((film) => genresSet.add(film.genre));

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter><Provider store={store}><MainPage
          films={filmsMock}
          genre={`Thriller`}
          onGenreClick={jest.fn()}
          genres={genresSet}
          onShowMoreButtonClick={jest.fn()}
          onOpenCloseVideoButtonClick={jest.fn()}
          onPostFavorite={jest.fn()}
          filmsCounter={1}
          promo={filmsListMock[0]}
        /></Provider></BrowserRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
