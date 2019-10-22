import React from 'react';
import renderer from 'react-test-renderer';

import FilmDetails from './film-details';

describe(`FilmDetails`, () => {
  const FilmCardMock = {
    id: 1,
    name: `Aviator`,
    src: `img/aviator.jpg`,
  };

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <FilmDetails
          film={FilmCardMock}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
