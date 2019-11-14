import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withIsPreviewPlaying from './with-is-preview-playing';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withIsPreviewPlaying(MockComponent);

describe(`HOC withIsPreviewPlaying`, () => {
  const wrapper = shallow(<MockComponentWrapped />);

  it(`return wrapped component with default value of prop isPreviewPlaying (false)`, () => {
    expect(wrapper.props().isPreviewPlaying).toEqual(false);
  });

  it(`after calling of setIsPreviewPlaying return wrapped component with proper value of isPreviewPlaying`, () => {
    wrapper.props().setIsPreviewPlaying(true);
    expect(wrapper.props().isPreviewPlaying).toEqual(true);
  });
});
