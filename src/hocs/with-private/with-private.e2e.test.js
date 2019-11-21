import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import withPrivate from './with-private';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withPrivate(MockComponent);

describe(`HOC withPrivate`, () => {
  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  const state1 = {
    isAuthorizationRequired: false,
  };
  const state2 = {
    isAuthorizationRequired: true,
  };
  const store1 = mockStore(state1);
  const store2 = mockStore(state2);
  const wrapper1 = mount(<BrowserRouter>
    <Provider store={store1}>
      <MockComponentWrapped />
    </Provider>
  </BrowserRouter>);
  const wrapper2 = mount(<BrowserRouter>
    <Provider store={store2}>
      <MockComponentWrapped />
    </Provider>
  </BrowserRouter>);

  it(`have to return div if isAuthorizationRequired is false`, () => {
    const div = wrapper1.find(`div`);
    expect(div).toHaveLength(1);
  });

  it(`should not return div if isAuthorizationRequired is true`, () => {
    const div = wrapper2.find(`div`);
    expect(div).toHaveLength(0);
  });
});
