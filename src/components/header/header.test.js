import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import {Header} from './header';

describe(`Header`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter><Header
          user={{
            id: 1,
            name: `Olga`,
            email: `r@ya.ru`,
            avatarUrl: `/img/photo.jpg`,
          }}
        /></BrowserRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
