import * as React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect, withRouter} from 'react-router-dom';

import Header from '../header/header';
import Tabs from '../tabs/tabs';
import withLabel from '../../hocs/with-label/with-label';
import FilmsList from '../films-list/films-list';
import Footer from '../footer/footer';
import {Operation} from '../../reducer/reducer';
import {getFilmsWithChangedUrl} from '../../reducer/selectors';
import {Film} from "../../types";

interface Props {
  onOpenCloseVideoButtonClick: (film: Film) => void;
  onLoadFilms: () => void;
  films: Film[];
  isAuthorizationRequired: boolean;
  onPostFavorite: (id: number, isFavorite: boolean, isPromo: boolean) => void;
  history: {
    push: (path: string) => void;
  };
  match: {
    params: {
      id: number;
    };
  };
}

const TabsWrapped = withLabel(Tabs);

const FilmDetails = (props: Props): React.SFC => {
  const {
    onOpenCloseVideoButtonClick,
    onLoadFilms,
    films,
    isAuthorizationRequired,
    onPostFavorite,
    history
  } = props;

  const renderPage = (film, filteredByGenreFilms): React.F => {
    return <React.Fragment>
      <section
        className="movie-card movie-card--full"
        style={{
          backgroundColor: `${film.backgroundColor}`,
        }}>
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={film.backgroundImage} alt={film.name} />
          </div>
          <Header />
          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{film.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{film.genre}</span>
                <span className="movie-card__year">{film.released}</span>
              </p>

              <div className="movie-card__buttons">
                <button
                  className="btn btn--play movie-card__button"
                  type="button"
                  onClick={(): void => onOpenCloseVideoButtonClick(film)}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  className="btn btn--list movie-card__button"
                  type="button"
                  onClick={(): void => isAuthorizationRequired ? history.push(`/login`) : onPostFavorite(film.id, film.isFavorite, false)}
                >
                  {film.isFavorite ? <svg viewBox="0 0 18 14" width="18" height="14">
                    <use xlinkHref="#in-list"></use>
                  </svg> : <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>}
                  <span>My list</span>
                </button>
                {!isAuthorizationRequired && <Link to={`/film/${film.id}/review`} className="btn movie-card__button">Add review</Link>}
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={film.posterImage} alt={film.name} width="218" height="327" />
            </div>
            <TabsWrapped
              film={film}
            />
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <div className="catalog__movies-list">
            <FilmsList
              films={filteredByGenreFilms}
              filmsCounter={4}
            />
          </div>
        </section>
        <Footer />
      </div></React.Fragment>;
  };

  if (films.length !== 0) {
    const id = props.match.params.id;
    const film = films.find((it) => it.id === +id);
    if (!film) {
      return <Redirect to="/"></Redirect>;
    }
    const filteredByGenreFilms = films.filter((item) => item.genre === film.genre && item.name !== film.name);

    return renderPage(film, filteredByGenreFilms);
  } else {
    onLoadFilms();
  }
  return null;
};

const mapStateToProps = (state, ownProps): object => Object.assign({}, ownProps, {
  films: getFilmsWithChangedUrl(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLoadFilms: (): void => dispatch(Operation.loadFilms()),
});

export {FilmDetails};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(withRouter(FilmDetails)));
