import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Avatar from '../avatar/avatar';
import Footer from '../footer/footer';
import FilmCard from '../film-card/film-card';
import withIsPreviewPlaying from '../../hocs/with-is-preview-playing/with-is-preview-playing';

const FilmCardWrapped = withIsPreviewPlaying(FilmCard);

const Favorites = (props) => {
  const {favorites, user} = props;
  const path = location.pathname === `/` ? null : `/`;

  return <div className="user-page">
    <header className="page-header user-page__head">
      <div className="logo">
        <a href={path} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      <h1 className="page-title user-page__title">My list</h1>

      <Avatar user={user}/>
    </header>

    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <div className="catalog__movies-list">
        {favorites.map((film) => <FilmCardWrapped film={film} key={film.id}/>)}
      </div>
    </section>

    <Footer />
  </div>;
};

Favorites.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
    videoLink: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    scoresCount: PropTypes.number.isRequired,
    runTime: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    isFavorite: PropTypes.bool.isRequired,
  })),
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
  match: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  favorites: state.favorites,
});

export {Favorites};
export default connect(mapStateToProps, null)(Favorites);
