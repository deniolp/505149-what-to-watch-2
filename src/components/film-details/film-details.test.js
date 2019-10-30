import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import FilmDetails from './film-details';
import filmsListMock from '../../mocks/films';

describe(`FilmDetails`, () => {
  const FilmCardMock = filmsListMock[0];

  it(`renders correctly`, () => {
    window.history.pushState({}, ``, `/film/1`);
    const tree = renderer.create(
        <BrowserRouter><FilmDetails
          film={FilmCardMock}
          match={{
            params: {
              id: 1,
            },
          }}
        /></BrowserRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
