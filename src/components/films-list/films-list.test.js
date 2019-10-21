import React from 'react';
import renderer from 'react-test-renderer';

import FilmsList from './films-list';

describe(`FilmsList`, () => {
  const filmsListMock = [
    {
      name: `Aviator`,
      src: `img/aviator.jpg`,
    },
    {
      name: `Shutter Island`,
      src: `img/shutter-island.jpg`,
    },
  ];

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <FilmsList
          films={filmsListMock}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
