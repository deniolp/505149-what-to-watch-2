import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Tabs from './tabs';
import filmsListMock from '../../mocks/films';

Enzyme.configure({adapter: new Adapter()});

describe(`In Tabs`, () => {
  const CLASSNAME_NOT_ACTIVE = `movie-nav__item`;
  const CLASSNAME_ACTIVE = `movie-nav__item movie-nav__item--active`;
  const filmMock = filmsListMock[0];

  const TabsWrapper = mount(<Tabs
    film={filmMock}
    label={`Overview`}
    setLabel={jest.fn()}
  />);
  const linkElements = TabsWrapper.find(`a`);

  it(`clicking on different links changing it's li's classNames in proper way according label from state`, () => {
    expect(linkElements).toHaveLength(3);
    expect(TabsWrapper.find(`li`).at(0).props().className).toEqual(CLASSNAME_ACTIVE);
    expect(TabsWrapper.find(`li`).at(1).props().className).toEqual(CLASSNAME_NOT_ACTIVE);
    TabsWrapper.setProps({label: `Details`});
    expect(TabsWrapper.find(`li`).at(1).props().className).toEqual(CLASSNAME_ACTIVE);
    expect(TabsWrapper.find(`li`).at(0).props().className).toEqual(CLASSNAME_NOT_ACTIVE);
  });
});
