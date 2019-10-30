import React from 'react';

const genres = [
  `All genres`,
  `Comedies`,
  `Crime`,
  `Documentary`,
  `Dramas`,
  `Horror`,
  `Kids & Family`,
  `Romance`,
  `Sci-Fi`,
  `Thrillers`,
];

const Genres = () => {
  return <ul className="catalog__genres-list">
    {genres.map((genre) => {
      return <li className="catalog__genres-item" key={genre}>
        <a className="catalog__genres-link">
          {genre}
        </a>
      </li>;
    })}
  </ul>;
};

export default Genres;
