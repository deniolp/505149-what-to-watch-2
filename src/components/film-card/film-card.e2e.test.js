import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FilmCard from './film-card';
import filmsListMock from '../../mocks/films';

Enzyme.configure({adapter: new Adapter()});

describe(`In FilmCard`, () => {
  const filmCardMock = filmsListMock[0];
  const filmCard = shallow(<FilmCard
    film={filmCardMock}
  />);

  it(`onclick on the link is sending to right url (film's id)`, () => {
    const linkElement = filmCard.find(`.small-movie-card__link`);

    expect(linkElement.props().to).toBe(`/film/${filmCardMock.id}`);
  });
});
