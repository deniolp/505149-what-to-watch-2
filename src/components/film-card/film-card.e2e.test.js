import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FilmCard from '../film-card/film-card';

Enzyme.configure({adapter: new Adapter()});

describe(`In FilmCard`, () => {
  const FilmCardMock = {
    id: 1,
    name: `Aviator`,
    src: `img/aviator.jpg`,
    genre: `Thriller`,
    year: 2010,
    score: 9.4,
    ratingLevel: `Very good`,
    ratingCount: 342,
    description: `Deserunt ex esse tempor aliqua labore ex ipsum ipsum. Minim elit anim consectetur eu cillum. Quis ut ut minim anim sit irure anim non officia id ex. Elit in ea ad elit consequat magna culpa excepteur Lorem. Excepteur sit sit enim irure enim in amet excepteur. Sunt ullamco et cupidatat est adipisicing occaecat nostrud voluptate aliquip consequat commodo adipisicing. Ipsum exercitation est consectetur aute magna anim dolore id enim.
    Sunt ullamco et cupidatat est adipisicing occaecat nostrud voluptate aliquip consequat commodo adipisicing. Ipsum exercitation est consectetur aute magna anim dolore id enim.`,
    director: `David Fincher`,
    starring: [
      `Daniel Day-Lewis`,
      `Jack Nicholson`,
      `Edward Norton`,
      `Jude Law`,
      `Willem Dafoe`,
    ],
  };

  it(`onmouseenter calling the card, on which entering`, () => {
    const mouseEnterHandler = jest.fn();
    const filmCard = shallow(<FilmCard
      film={FilmCardMock}
      onCardMouseEnter={mouseEnterHandler}
      onFilmTitleClick={jest.fn()}
    />);

    const articleElement = filmCard.find(`.small-movie-card`);
    articleElement.simulate(`mouseenter`);

    expect(mouseEnterHandler).toHaveBeenCalledWith(FilmCardMock);
  });
});
