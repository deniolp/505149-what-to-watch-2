import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import App from './components/app/app';
import filmsListMock from './mocks/films';

const init = () => {
  ReactDom.render(
      <BrowserRouter><App
        films={filmsListMock}
      /></BrowserRouter>,
      document.querySelector(`#root`)
  );
};

init();
