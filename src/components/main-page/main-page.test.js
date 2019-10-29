import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import MainPage from './main-page';
import filmsListMock from '../../mocks/films';

describe(`MainPage`, () => {
  const filmsMock = filmsListMock.slice(0, 2);

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter><MainPage
          films={filmsMock}
        /></BrowserRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
