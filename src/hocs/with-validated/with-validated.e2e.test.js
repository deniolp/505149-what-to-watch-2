import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withValidated from './with-validated';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withValidated(MockComponent);

describe(`HOC withValidated`, () => {
  const wrapper = shallow(<MockComponentWrapped />);
  const evt = {
    target: {
      value: `Kukusiki! That is for this test - return wrapped component with default value of prop isValidated`,
    },
    preventDefault: jest.fn(),
  };

  it(`return wrapped component with default value of prop isValidated`, () => {
    expect(wrapper.props().isValidated).toEqual(false);
  });

  it(`after calling of setIsRadioPressed & setIsValidated return wrapped component with proper value of prop isValidated`, () => {
    wrapper.props().onRadioClick();
    wrapper.props().onTextareaChange(evt);
    expect(wrapper.props().isValidated).toEqual(true);
  });
});
