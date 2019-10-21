import React from 'react';
import ReactDom from 'react-dom';

import App from './components/app/app';
import filmsListMock from './mocks/films';

const init = () => {
  ReactDom.render(
      <App
        films={filmsListMock}
      />,
      document.querySelector(`#root`)
  );
};

init();
