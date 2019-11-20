import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import AddReview from './add-review';
import filmsListMock from '../../mocks/films';

describe(`AddReview`, () => {
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

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter><Provider store={store}><AddReview
          isAuthorizationRequired={false}
          match={{
            params: {
              id: 1,
            },
          }}
          films={filmsListMock}
          user={{
            id: 1,
            name: `Olga`,
            email: `r@ya.ru`,
            avatarUrl: `/img/photo.jpg`,
          }}
        /></Provider></BrowserRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
