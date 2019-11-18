import React from 'react';
import renderer from 'react-test-renderer';

import Review from './review';
import commentsListMock from '../../mocks/comments';

describe(`Review`, () => {
  const review = commentsListMock[0];

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <Review
          review={review}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
