import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FilmCard from '../film-card/film-card';

Enzyme.configure({adapter: new Adapter()});

describe(`In FilmCard`, () => {
  const FilmCardMock = {
    name: `Aviator`,
    src: `img/aviator.jpg`,
  };

  it(`onmouseenter calling the card, on which entering`, () => {
    const mouseEnterHandler = jest.fn();
    const filmCard = shallow(<FilmCard
      film={FilmCardMock}
      onCardMouseEnter={mouseEnterHandler}
    />);

    const articleElement = filmCard.find(`.small-movie-card`);
    articleElement.simulate(`mouseenter`);

    expect(mouseEnterHandler).toHaveBeenCalledWith(FilmCardMock);
  });
});
