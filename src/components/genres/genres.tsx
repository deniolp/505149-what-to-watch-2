import * as React from 'react';

interface Props {
  activeGenre: string;
  onGenreClick: (genre: string) => void;
  genres: string[];
}

const Genres = (props: Props): React.SFC => {
  const {activeGenre, onGenreClick, genres} = props;

  return <ul className="catalog__genres-list">
    {Array.from(genres).slice(0, 10).map((item) => {
      return <li className={`catalog__genres-item${item === activeGenre ? ` catalog__genres-item--active` : ``}`} key={item}>
        <a className="catalog__genres-link"
          onClick={(): void => onGenreClick(item)}
          style={{
            cursor: `pointer`,
          }}>
          {item}
        </a>
      </li>;
    })}
  </ul>;
};

export default React.memo(Genres);
