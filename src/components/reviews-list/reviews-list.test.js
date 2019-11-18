import React from 'react';
import renderer from 'react-test-renderer';

import {ReviewsList} from './reviews-list';
import commentsListMock from '../../mocks/comments';

describe(`ReviewsList`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(
        <ReviewsList
          reviews={commentsListMock}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
