import React from 'react';
import renderer from 'react-test-renderer';

import Genres from './genres';

describe(`Genres`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(
        <Genres
          activeGenre={`Thriller`}
          onGenreClick={jest.fn()}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
