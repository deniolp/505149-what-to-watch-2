import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import FilmCard from './film-card';
import filmsListMock from '../../mocks/films';

describe(`FilmCard`, () => {
  const filmCardMock = filmsListMock[0];

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter><FilmCard
          film={filmCardMock}
          onCardMouseEnter={jest.fn()}
          onCardMouseLeave={jest.fn()}
          setIsPreviewPlaying={jest.fn()}
          isPreviewPlaying={false}
        /></BrowserRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
