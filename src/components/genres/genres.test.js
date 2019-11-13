import React from 'react';
import renderer from 'react-test-renderer';

import Genres from './genres';
import filmsMocks from '../../mocks/films';

describe(`Genres`, () => {
  const genresSet = new Set().add(`All genres`);
  filmsMocks.forEach((film) => genresSet.add(film.genre));

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <Genres
          activeGenre={`Thriller`}
          onGenreClick={jest.fn()}
          genres={genresSet}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
