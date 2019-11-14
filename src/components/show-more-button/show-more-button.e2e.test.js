import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ShowMoreButton from './show-more-button';

Enzyme.configure({adapter: new Adapter()});

describe(`In ShowMoreButton`, () => {
  const showMoreButtonWrapper = mount(<ShowMoreButton
    onShowMoreButtonClick={jest.fn()}
    shouldShowButton={true}
  />);

  let buttonElement = showMoreButtonWrapper.find(`button`);

  it(`has to be button element`, () => {
    expect(showMoreButtonWrapper.props().shouldShowButton).toEqual(true);
    expect(buttonElement).toHaveLength(1);
  });

  it(`has not to be button element if shouldShowButton prop is false`, () => {
    showMoreButtonWrapper.setProps({shouldShowButton: false});
    expect(showMoreButtonWrapper.props().shouldShowButton).toEqual(false);
    buttonElement = showMoreButtonWrapper.render().find(`button`);
    expect(buttonElement).toHaveLength(0);
  });

  it(`has to be button element if shouldShowButton prop is true again`, () => {
    showMoreButtonWrapper.setProps({shouldShowButton: true});
    expect(showMoreButtonWrapper.props().shouldShowButton).toEqual(true);
    buttonElement = showMoreButtonWrapper.render().find(`button`);
    expect(buttonElement).toHaveLength(1);
  });
});
