import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withVideo from './with-video';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withVideo(MockComponent);

describe(`HOC withVideo`, () => {
  const wrapper = shallow(<MockComponentWrapped />);

  it(`return wrapped component with default value of prop isPlaying (false)`, () => {
    expect(wrapper.props().isPlaying).toEqual(false);
  });

  it(`after calling of setIsPlaying return wrapped component with proper value of isPlaying`, () => {
    wrapper.props().setIsPlaying(`Hi, HOC!`);
    expect(wrapper.props().isPlaying).toEqual(`Hi, HOC!`);
  });
});
