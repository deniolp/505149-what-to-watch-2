import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import FilmsList from './films-list';

describe(`FilmsList`, () => {
  const filmsListMock = [
    {
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
    },
    {
      id: 2,
      name: `Shutter Island`,
      src: `img/shutter-island.jpg`,
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
    },
  ];

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter><FilmsList
          films={filmsListMock}
          onFilmTitleClick={jest.fn()}
        /></BrowserRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
