import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import FilmCard from './film-card';
import filmsListMock from '../../mocks/films';

describe(`FilmCard`, () => {
  const FilmCardMock = filmsListMock[0];

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter><FilmCard
          film={FilmCardMock}
          onCardMouseEnter={jest.fn()}
          onFilmTitleClick={jest.fn()}
        /></BrowserRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
