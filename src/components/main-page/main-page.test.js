import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import MainPage from './main-page';
import filmsListMock from '../../mocks/films';

describe(`MainPage`, () => {
  const filmsMock = filmsListMock.slice(0, 2);
  const genresSet = new Set().add(`All genres`);
  filmsListMock.forEach((film) => genresSet.add(film.genre));

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter><MainPage
          films={filmsMock}
          genre={`Thriller`}
          onGenreClick={jest.fn()}
          genres={genresSet}
          onShowMoreButtonClick={jest.fn()}
          onOpenCloseVideoButtonClick={jest.fn()}
          filmsCounter={1}
        /></BrowserRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
