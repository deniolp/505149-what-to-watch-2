import React from 'react';
import renderer from 'react-test-renderer';

import App from './app';

describe(`App`, () => {
  const filmsListMock = [`Aviator`, `Shutter Island`, `Macbeth`, `Revenant`];
  const clickHandler = jest.fn();

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <App
          films={filmsListMock}
          onTitleClick={clickHandler}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
