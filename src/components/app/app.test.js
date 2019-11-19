import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import {App} from './app';
import filmsListMock from '../../mocks/films';

describe(`App`, () => {
  it(`renders correctly`, () => {
    const middleware = [thunk];
    const mockStore = configureMockStore(middleware);
    const initialState = {
      genre: `All genres`,
      films: [],
      comments: [],
      filmsCounter: 8,
      playingFilm: false,
      isAuthorizationRequired: false,
      user: {},
    };
    const store = mockStore(initialState);

    const tree = renderer.create(
        <BrowserRouter><Provider store={store}><App
          films={filmsListMock}
          genre={`Thriller`}
          onGenreClick={jest.fn()}
          onShowMoreButtonClick={jest.fn()}
          onResetFilmsCounter={jest.fn()}
          onOpenCloseVideoButtonClick={jest.fn()}
          onLoadComments={jest.fn()}
          onChangeIsAuthorisationRequired={jest.fn()}
          filmsCounter={1}
          playingFilm= {false}
          isAuthorizationRequired= {false}
          promo={filmsListMock[0]}
        /></Provider></BrowserRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
