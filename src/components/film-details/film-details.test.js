import React from 'react';
import renderer from 'react-test-renderer';

import FilmDetails from './film-details';

describe(`FilmDetails`, () => {
  const FilmCardMock = {
    id: 1,
    name: `Aviator`,
    src: `img/aviator.jpg`,
    genre: `Drama`,
    year: 2008,
    score: 8.3,
    ratingLevel: `Good`,
    ratingCount: 187,
    description: `Deserunt ex esse tempor aliqua labore ex ipsum ipsum. Minim elit anim consectetur eu cillum. Quis ut ut minim anim sit irure anim non officia id ex. Elit in ea ad elit consequat magna culpa excepteur Lorem. Excepteur sit sit enim irure enim in amet excepteur. Sunt ullamco et cupidatat est adipisicing occaecat nostrud voluptate aliquip consequat commodo adipisicing. Ipsum exercitation est consectetur aute magna anim dolore id enim.
    Sunt ullamco et cupidatat est adipisicing occaecat nostrud voluptate aliquip consequat commodo adipisicing. Ipsum exercitation est consectetur aute magna anim dolore id enim.`,
    director: `Christopher Nolan`,
    starring: [
      `Bill Murray`,
      `Jack Nicholson`,
      `Edward Norton`,
      `Jude Law`,
      `Dustin Hoffman`,
    ],
  };

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <FilmDetails
          film={FilmCardMock}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
