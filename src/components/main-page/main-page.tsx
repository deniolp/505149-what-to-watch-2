import * as React from 'react';
import {withRouter} from 'react-router-dom';

import Header from '../header/header';
import Genres from '../genres/genres';
import FilmsList from '../films-list/films-list';
import ShowMoreButton from '../show-more-button/show-more-button';
import Footer from '../footer/footer';
import {Film} from "../../types";

interface Props {
  films: Film[];
  genre: string;
  onGenreClick: (genre: string) => void;
  genres: string[];
  filmsCounter: number;
  onShowMoreButtonClick: () => void;
  onOpenCloseVideoButtonClick: (film: Film) => void;
  onPostFavorite: (id: number, isFavorite: boolean, isPromo: boolean) => void;
  promo: Film;
  isAuthorizationRequired: boolean;
  history: {
    push: (path: string) => void;
  };
}

const MainPage = (props: Props) => {
  const {
    films,
    genre,
    onGenreClick,
    genres,
    filmsCounter,
    onShowMoreButtonClick,
    onOpenCloseVideoButtonClick,
    onPostFavorite,
    promo,
    isAuthorizationRequired,
    history
  } = props;

  const getFilmsLength = () => {
    const filteredFilms = genre === `All genres` ? films : films.filter((film) => film.genre === genre);
    return filteredFilms.length;
  };

  return <React.Fragment>
    <section className="movie-card">
      <div
        className="movie-card__bg"
        style={{
          backgroundColor: `${promo.backgroundColor}`,
        }}>
        <img
          src={promo.backgroundImage}
          alt={promo.name}
        />
      </div>
      <Header />
      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img
              src={promo.posterImage}
              alt={promo.name}
              width="218"
              height="327"
            />
          </div>

          <div className="movie-card__desc">
            <h2 className="movie-card__title">{promo.name}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{promo.genre}</span>
              <span className="movie-card__year">{promo.released}</span>
            </p>

            <div className="movie-card__buttons">
              <button
                className="btn btn--play movie-card__button"
                type="button"
                onClick={() => onOpenCloseVideoButtonClick(films[0])}
              >
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button
                className="btn btn--list movie-card__button"
                type="button"
                onClick={() => isAuthorizationRequired ? history.push(`/login`) : onPostFavorite(promo.id, promo.isFavorite, true)}
              >
                {promo.isFavorite ? <svg viewBox="0 0 18 14" width="18" height="14">
                  <use xlinkHref="#in-list"></use>
                </svg> : <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>}
                <span>My list</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <Genres
          activeGenre={genre}
          onGenreClick={onGenreClick}
          genres={genres}
        />
        <div className="catalog__movies-list">
          <FilmsList
            films={films}
            filmsCounter={filmsCounter}
            activeGenre={genre}
          />
        </div>
        <ShowMoreButton
          onShowMoreButtonClick={onShowMoreButtonClick}
          shouldShowButton={filmsCounter < getFilmsLength()}
        />
      </section>
      <Footer />
    </div>
  </React.Fragment>;
};

export default React.memo(withRouter(MainPage));
