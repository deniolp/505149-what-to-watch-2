import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import {App} from './app';
import filmsListMock from '../../mocks/films';

describe(`App`, () => {
  const filmsMock = filmsListMock.slice(0, 2);

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter><App
          films={filmsMock}
          genre={`Thriller`}
          onGenreClick={jest.fn()}
        /></BrowserRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
