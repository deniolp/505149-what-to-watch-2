import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {SignIn} from './sign-in';

describe(`SignIn`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(
        <SignIn
          isAuthorizationRequired={true}
          submitForm={jest.fn()}
          error={null}
          setError={jest.fn()}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
