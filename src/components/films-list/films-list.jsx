import React from 'react';
import PropTypes from 'prop-types';

import FilmCard from '../film-card/film-card';

class FilmsList extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {films, onCardHover} = this.props;

    return films.map((film) => {
      return <FilmCard
        key={film.name}
        film={film}
        onCardHover={onCardHover}
      />;
    });
  }
}

FilmsList.propTypes = {
  films: PropTypes.array.isRequired,
  onCardHover: PropTypes.func.isRequired,
};

export default FilmsList;
