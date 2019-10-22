import React from 'react';
import renderer from 'react-test-renderer';

import SvgLogo from './svg-logo';

describe(`SvgLogo`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(
        <SvgLogo/>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
