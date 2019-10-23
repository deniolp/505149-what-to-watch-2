import React from 'react';
import PropTypes from 'prop-types';

import FilmCard from '../film-card/film-card';

class FilmsList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: {},
    };

    this._handleCardMouseEnter = this._handleCardMouseEnter.bind(this);
  }

  render() {
    const {films, onFilmTitleClick} = this.props;

    return films.map((film) => {
      return <FilmCard
        key={film.id}
        film={film}
        onCardMouseEnter={this._handleCardMouseEnter}
        onFilmTitleClick={onFilmTitleClick}
      />;
    });
  }

  _handleCardMouseEnter(film) {
    this.setState({
      activeCard: film,
    });
  }
}

FilmsList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    ratingLevel: PropTypes.string.isRequired,
    ratingCount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
  })),
  onFilmTitleClick: PropTypes.func.isRequired,
};

export default FilmsList;
