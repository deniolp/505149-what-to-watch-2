import * as React from 'react';
import * as ReactDom from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import App from './components/app/app';
import {reducer, Operation} from './reducer/reducer';
import createAPI from './api';

let store;

const init = () => {
  const api = createAPI((...args) => store.dispatch(...args));

  store = createStore(
      reducer,
      composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))));

  store.dispatch(Operation.loadPromoFilm());
  store.dispatch(Operation.loadFilms());
  store.dispatch(Operation.checkIsLogin());

  ReactDom.render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
