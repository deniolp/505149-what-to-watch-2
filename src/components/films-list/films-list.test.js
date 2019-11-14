import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import FilmsList from './films-list';
import filmsListMock from '../../mocks/films';

describe(`FilmsList`, () => {
  const filmsMock = filmsListMock.slice(0, 2);

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter><FilmsList
          films={filmsMock}
          filmsCounter={2}
        /></BrowserRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
