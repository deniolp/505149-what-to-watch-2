import * as React from 'react';

import TabsBelowInfo from '../tabs-below-info/tabs-below-info';
import {Film} from "../../types";

interface Props {
  film: Film;
  label: string;
  setLabel: (label: string) => void;
}

const Tabs = (props: Props): React.SFC => {
  const {film, label, setLabel} = props;

  return <div className="movie-card__desc">
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        <li className={`movie-nav__item${label === `Overview` ? ` movie-nav__item--active` : ``}`}>
          <a
            onClick={(): void => setLabel(`Overview`)}
            className="movie-nav__link"
            style={{
              cursor: `pointer`,
            }}
          >Overview</a>
        </li>
        <li className={`movie-nav__item${label === `Details` ? ` movie-nav__item--active` : ``}`}>
          <a
            onClick={(): void => setLabel(`Details`)}
            className="movie-nav__link"
            style={{
              cursor: `pointer`,
            }}
          >Details</a>
        </li>
        <li className={`movie-nav__item${label === `Reviews` ? ` movie-nav__item--active` : ``}`}>
          <a
            onClick={(): void => setLabel(`Reviews`)}
            className="movie-nav__link"
            style={{
              cursor: `pointer`,
            }}
          >Reviews</a>
        </li>
      </ul>
    </nav>
    <TabsBelowInfo
      label={label}
      film={film}
    />
  </div>;
};

export default React.memo(Tabs);
