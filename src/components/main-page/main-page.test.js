import React from 'react';
import renderer from 'react-test-renderer';

import MainPage from './main-page';

describe(`MainPage`, () => {
  const filmsListMock = [
    {
      id: 1,
      name: `Aviator`,
      src: `img/aviator.jpg`,
    },
    {
      id: 2,
      name: `Shutter Island`,
      src: `img/shutter-island.jpg`,
    },
  ];

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <MainPage
          films={filmsListMock}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
