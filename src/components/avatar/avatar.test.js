import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import Avatar from './avatar';

describe(`Avatar`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter><Avatar
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
