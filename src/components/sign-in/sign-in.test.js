import React from 'react';
import renderer from 'react-test-renderer';

import {SignIn} from './sign-in';

describe(`SignIn`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(
        <SignIn
          isAuthorizationRequired={true}
          submitForm={jest.fn()}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
