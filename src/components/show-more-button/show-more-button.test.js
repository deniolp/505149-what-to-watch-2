import React from 'react';
import renderer from 'react-test-renderer';

import ShowMoreButton from './show-more-button';

describe(`ShowMoreButton`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(
        <ShowMoreButton
          onShowMoreButtonClick={jest.fn()}
          shouldShowButton={true}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
