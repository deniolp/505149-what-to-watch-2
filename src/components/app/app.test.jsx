import React from 'react';
import renderer from 'react-test-renderer';

import App from '../app/app';

describe(`App`, () => {
  const filmsListMock = [`Aviator`, `Shutter Island`, `Macbeth`, `Revenant`];

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <App
          films={filmsListMock}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
