import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withError from './with-error';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withError(MockComponent);

describe(`HOC withError`, () => {
  const wrapper = shallow(<MockComponentWrapped />);

  it(`return wrapped component with default value of prop label (Overview)`, () => {
    expect(wrapper.props().error).toEqual(null);
  });

  it(`after calling of setLabel return wrapped component with proper value of label`, () => {
    wrapper.props().setError(`Hi, HOC!`);
    expect(wrapper.props().error).toEqual(`Hi, HOC!`);
  });
});
