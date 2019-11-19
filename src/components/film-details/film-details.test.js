import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import {FilmDetails} from './film-details';
import filmsListMock from '../../mocks/films';

describe(`FilmDetails`, () => {
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

  it(`renders correctly`, () => {
    window.history.pushState({}, ``, `/film/1`);
    const tree = renderer.create(
        <BrowserRouter><Provider store={store}><FilmDetails
          films={filmsListMock}
          match={{
            params: {
              id: 1,
            },
          }}
          onOpenCloseVideoButtonClick={jest.fn()}
          onLoadFilms={jest.fn()}
        /></Provider></BrowserRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
