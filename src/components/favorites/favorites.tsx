import * as React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Avatar from '../avatar/avatar';
import Footer from '../footer/footer';
import FilmCard from '../film-card/film-card';
import withIsPreviewPlaying from '../../hocs/with-is-preview-playing/with-is-preview-playing';
import {getFavoritesWithChangedUrl} from '../../reducer/selectors';
import {Film, User} from "../../types";

interface Props {
  favorites: Film[];
  user: User;
}

const FilmCardWrapped = withIsPreviewPlaying(FilmCard);

const Favorites = (props: Props): React.SFC => {
  const {favorites, user} = props;

  return <div className="user-page">
    <header className="page-header user-page__head">
      <div className="logo">
        <Link className="logo__link" to="/">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
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

const mapStateToProps = (state, ownProps): object => Object.assign({}, ownProps, {
  favorites: getFavoritesWithChangedUrl(state),
});

export {Favorites};
export default connect(mapStateToProps, null)(React.memo(Favorites));
