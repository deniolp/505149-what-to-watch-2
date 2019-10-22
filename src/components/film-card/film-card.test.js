import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import FilmCard from './film-card';

describe(`FilmCard`, () => {
  const FilmCardMock = {
    id: 1,
    name: `Aviator`,
    src: `img/aviator.jpg`,
  };

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
