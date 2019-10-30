import React from 'react';
import renderer from 'react-test-renderer';

import Tabs from './tabs';
import filmsListMock from '../../mocks/films';

describe(`Tabs`, () => {
  const film = filmsListMock[0];

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <Tabs
          film={film}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
