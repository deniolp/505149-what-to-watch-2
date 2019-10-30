import React from 'react';
import renderer from 'react-test-renderer';

import ReviewsList from './reviews-list';
import filmsListMock from '../../mocks/films';

describe(`ReviewsList`, () => {
  const film = filmsListMock[0];

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <ReviewsList
          reviews={film.reviews}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
