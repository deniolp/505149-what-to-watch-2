import * as React from 'react';
import * as ReactDom from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {compose} from 'recompose';

import App from './components/app/app';
import {reducer, Operation} from './reducer/reducer';
import createAPI from './api';

let store;
declare const __REDUX_DEVTOOLS_EXTENSION__: () => any;

const init = () => {
  const api = createAPI((...args) => store.dispatch(...args));

  store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          __REDUX_DEVTOOLS_EXTENSION__ ? __REDUX_DEVTOOLS_EXTENSION__() : (f) => f
      ));

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
