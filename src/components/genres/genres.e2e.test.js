import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Genres from './genres';

Enzyme.configure({adapter: new Adapter()});

describe(`In Genres`, () => {
  const CLASSNAME_NOT_ACTIVE = `catalog__genres-item`;
  const CLASSNAME_ACTIVE = `catalog__genres-item catalog__genres-item--active`;

  const GenresWrapper = shallow(<Genres/>);
  const linkElements = GenresWrapper.find(`a`);

  it(`clicking on different links changing it's li's classNames in proper way according genreLabel from state`, () => {
    expect(linkElements).toHaveLength(10);
    linkElements.at(2).simulate(`click`);
    expect(GenresWrapper.find(`li`).at(1).props().className).toEqual(CLASSNAME_NOT_ACTIVE);
    expect(GenresWrapper.find(`li`).at(2).props().className).toEqual(CLASSNAME_ACTIVE);
    linkElements.at(6).simulate(`click`);
    expect(GenresWrapper.find(`li`).at(6).props().className).toEqual(CLASSNAME_ACTIVE);
    expect(GenresWrapper.find(`li`).at(0).props().className).toEqual(CLASSNAME_NOT_ACTIVE);
    expect(GenresWrapper.find(`li`).at(7).props().className).toEqual(CLASSNAME_NOT_ACTIVE);
  });
});
