import React from 'react';
import ReactDom from 'react-dom';

import App from './components/app/app';

const filmsListMock = [`Aviator`, `Shutter Island`, `Macbeth`, `Revenant`];

const init = () => {
  ReactDom.render(
      <App films={filmsListMock}/>,
      document.querySelector(`#root`)
  );
};

init();
