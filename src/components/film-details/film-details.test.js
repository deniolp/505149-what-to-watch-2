import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import {FilmDetails} from './film-details';
import filmsListMock from '../../mocks/films';

describe(`FilmDetails`, () => {
  it(`renders correctly`, () => {
    window.history.pushState({}, ``, `/film/1`);
    const tree = renderer.create(
        <BrowserRouter><FilmDetails
          films={filmsListMock}
          match={{
            params: {
              id: 1,
            },
          }}
          onOpenCloseVideoButtonClick={jest.fn()}
          onLoadFilms={jest.fn()}
        /></BrowserRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
