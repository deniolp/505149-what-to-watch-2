import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FilmCard from './film-card';
import filmsListMock from '../../mocks/films';

Enzyme.configure({adapter: new Adapter()});

describe(`In FilmCard`, () => {
  const filmCardMock = filmsListMock[0];
  const mouseEnterHandler = jest.fn();
  const mouseLeaveHandler = jest.fn();
  const filmCard = shallow(<FilmCard
    film={filmCardMock}
    onCardMouseEnter={mouseEnterHandler}
    onCardMouseLeave={mouseLeaveHandler}
    isPreviewPlaying={false}
  />);
  const articleElement = filmCard.find(`.small-movie-card`);

  it(`onmouseenter over the card is calling callback with true`, () => {
    articleElement.simulate(`mouseenter`);

    setTimeout(() => expect(mouseEnterHandler).toHaveBeenCalledWith(true), 1000);
  });

  it(`onmouseleave from the card is calling callback with false`, () => {
    articleElement.simulate(`mouseleave`);

    expect(mouseLeaveHandler).toHaveBeenCalledWith(false);
  });

  it(`onclick on the link is sending to right url (film's id)`, () => {
    const linkElement = filmCard.find(`.small-movie-card__link`);

    expect(linkElement.props().to).toBe(`/film/${filmCardMock.id}`);
  });
});
