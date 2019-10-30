import React, {useState} from 'react';

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
  const [genreLabel, setGenreLabel] = useState(`All genres`);

  return <ul className="catalog__genres-list">
    {genres.map((genre) => {
      return <li className={`catalog__genres-item${genreLabel === genre ? ` catalog__genres-item--active` : ``}`} key={genre}>
        <a className="catalog__genres-link"
          onClick={() => setGenreLabel(genre)}
          style={{
            cursor: `pointer`,
          }}>
          {genre}
        </a>
      </li>;
    })}
  </ul>;
};

export default Genres;
