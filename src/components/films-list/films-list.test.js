import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import FilmsList from './films-list';

describe(`FilmsList`, () => {
  const filmsListMock = [
    {
      id: 1,
      name: `Aviator`,
      src: `img/aviator.jpg`,
    },
    {
      id: 2,
      name: `Shutter Island`,
      src: `img/shutter-island.jpg`,
    },
  ];

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter><FilmsList
          films={filmsListMock}
          onFilmTitleClick={jest.fn()}
        /></BrowserRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
