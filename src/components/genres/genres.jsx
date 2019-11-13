import React from 'react';
import PropTypes from 'prop-types';

const Genres = (props) => {
  const {activeGenre, onGenreClick, genres} = props;

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
  genres: PropTypes.instanceOf(Set).isRequired,
};

export default Genres;
