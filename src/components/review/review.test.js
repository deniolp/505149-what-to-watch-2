import React from 'react';
import renderer from 'react-test-renderer';

import Review from './review';
import filmsListMock from '../../mocks/films';

describe(`Review`, () => {
  const film = filmsListMock[0];

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <Review
          review={film.reviews[0]}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
