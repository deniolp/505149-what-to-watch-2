import React from 'react';
import renderer from 'react-test-renderer';

import TabsBelowInfo from './tabs-below-info';
import filmsListMock from '../../mocks/films';

describe(`TabsBelowInfo`, () => {
  const film = filmsListMock[0];

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <TabsBelowInfo
          film={film}
          label={`Overview`}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
