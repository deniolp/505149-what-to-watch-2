import React from 'react';
import renderer from 'react-test-renderer';

import FilmDetails from './film-details';
import filmsListMock from '../../mocks/films';

describe(`FilmDetails`, () => {
  const FilmCardMock = filmsListMock[0];

  it(`renders correctly`, () => {
    window.history.pushState({}, ``, `/film/1`);
    const tree = renderer.create(
        <FilmDetails
          film={FilmCardMock}
          match={{
            params: {
              id: 1,
            },
          }}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
