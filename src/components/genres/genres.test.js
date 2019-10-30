import React from 'react';
import renderer from 'react-test-renderer';

import Genres from './genres';

describe(`Genres`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(
        <Genres />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
