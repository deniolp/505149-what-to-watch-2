import React from 'react';
import renderer from 'react-test-renderer';

import {Header} from './header';

describe(`Header`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(
        <Header
          user={{
            id: 1,
            name: `Olga`,
            email: `r@ya.ru`,
            avatarUrl: `/img/photo.jpg`,
          }}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
