import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FilmCard from '../film-card/film-card';
import filmsListMock from '../../mocks/films';

Enzyme.configure({adapter: new Adapter()});

describe(`In FilmCard`, () => {
  const FilmCardMock = filmsListMock[0];
  const mouseEnterHandler = jest.fn();
  const clickLinkHandler = jest.fn();
  const filmCard = shallow(<FilmCard
    film={FilmCardMock}
    onCardMouseEnter={mouseEnterHandler}
    onFilmTitleClick={clickLinkHandler}
  />);

  it(`onmouseenter over the card is calling callback with this card`, () => {
    const articleElement = filmCard.find(`.small-movie-card`);
    articleElement.simulate(`mouseenter`);

    expect(mouseEnterHandler).toHaveBeenCalledWith(FilmCardMock);
  });

  it(`onclick on the link is calling callback with the right id`, () => {
    const linkElement = filmCard.find(`.small-movie-card__link`);
    linkElement.simulate(`click`);

    expect(clickLinkHandler).toHaveBeenCalledWith(FilmCardMock.id);
  });
});
