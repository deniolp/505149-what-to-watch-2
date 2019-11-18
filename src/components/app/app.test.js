import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import {App} from './app';
import filmsListMock from '../../mocks/films';

describe(`App`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter><App
          films={filmsListMock}
          genre={`Thriller`}
          onGenreClick={jest.fn()}
          onShowMoreButtonClick={jest.fn()}
          onResetFilmsCounter={jest.fn()}
          onOpenCloseVideoButtonClick={jest.fn()}
          onLoadComments={jest.fn()}
          filmsCounter={1}
          playingFilm= {false}
        /></BrowserRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
