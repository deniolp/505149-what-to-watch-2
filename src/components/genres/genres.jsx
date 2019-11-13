import React from 'react';
import PropTypes from 'prop-types';

import filmsMocks from '../../mocks/films';

const genres = new Set().add(`All genres`);
filmsMocks.forEach((film) => genres.add(film.genre));

const Genres = (props) => {
  const {activeGenre, onGenreClick} = props;

  return <ul className="catalog__genres-list">
    {Array.from(genres).map((item) => {
      return <li className={`catalog__genres-item${item === activeGenre ? ` catalog__genres-item--active` : ``}`} key={item}>
        <a className="catalog__genres-link"
          onClick={() => onGenreClick(item)}
          style={{
            cursor: `pointer`,
          }}>
          {item}
        </a>
      </li>;
    })}
  </ul>;
};

Genres.propTypes = {
  activeGenre: PropTypes.string.isRequired,
  onGenreClick: PropTypes.func.isRequired,
};

export default Genres;
