import React, {useState} from 'react';
import PropTypes from 'prop-types';

import TabsBelowInfo from '../tabs-below-info/tabs-below-info';

const Tabs = (props) => {
  const {film} = props;
  const [label, setLabel] = useState(`Overview`);

  return <div className="movie-card__desc">
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        <li className={`movie-nav__item${label === `Overview` ? ` movie-nav__item--active` : ``}`}>
          <a
            onClick={() => setLabel(`Overview`)}
            className="movie-nav__link"
            style={{
              cursor: `pointer`,
            }}
          >Overview</a>
        </li>
        <li className={`movie-nav__item${label === `Details` ? ` movie-nav__item--active` : ``}`}>
          <a
            onClick={() => setLabel(`Details`)}
            className="movie-nav__link"
            style={{
              cursor: `pointer`,
            }}
          >Details</a>
        </li>
        <li className={`movie-nav__item${label === `Reviews` ? ` movie-nav__item--active` : ``}`}>
          <a
            onClick={() => setLabel(`Reviews`)}
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

Tabs.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    ratingLevel: PropTypes.string.isRequired,
    ratingCount: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    reviews: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })),
  }),
};

export default Tabs;
