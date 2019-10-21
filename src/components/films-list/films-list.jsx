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
    const {films} = this.props;

    return films.map((film) => {
      return <FilmCard
        key={film.name}
        film={film}
        onCardMouseEnter={this._handleCardMouseEnter}
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
    name: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  })),
};

export default FilmsList;
