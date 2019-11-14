import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withLabel from './with-label';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withLabel(MockComponent);

describe(`HOC withLabel`, () => {
  const wrapper = shallow(<MockComponentWrapped />);

  it(`return wrapped component with default value of prop label (Overview)`, () => {
    expect(wrapper.props().label).toEqual(`Overview`);
  });

  it(`after calling of setLabel return wrapped component with proper value of label`, () => {
    wrapper.props().setLabel(`Hi, HOC!`);
    expect(wrapper.props().label).toEqual(`Hi, HOC!`);
  });
});
