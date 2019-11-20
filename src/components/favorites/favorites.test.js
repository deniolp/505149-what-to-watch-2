import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import Favorites from './favorites';
import filmsListMock from '../../mocks/films';

describe(`Favorites`, () => {
  it(`renders correctly`, () => {
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

    const tree = renderer.create(
        <BrowserRouter><Provider store={store}><Favorites
          user={{
            id: 1,
            name: `Olga`,
            email: `r@ya.ru`,
            avatarUrl: `/img/photo.jpg`,
          }}
          favorites={filmsListMock.slice(0, 2)}
          match={{
            params: {
              id: 1,
            },
          }}
        /></Provider></BrowserRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
