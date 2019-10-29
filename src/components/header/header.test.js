import React from 'react';
import renderer from 'react-test-renderer';

import Header from './header';

describe(`Header`, () => {
  it(`renders correctly`, () => {
    window.history.pushState({}, ``, `/film/1`);
    const tree = renderer.create(
        <Header/>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
