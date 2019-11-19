import React from 'react';
import PropTypes from 'prop-types';

import Header from '../header/header';
import Genres from '../genres/genres';
import FilmsList from '../films-list/films-list';
import ShowMoreButton from '../show-more-button/show-more-button';
import Footer from '../footer/footer';

const MainPage = (props) => {
  const {films, genre, onGenreClick, genres, filmsCounter, onShowMoreButtonClick, onOpenCloseVideoButtonClick, promo} = props;
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
              >
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
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

MainPage.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
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
  promo: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    posterImage: PropTypes.string,
    previewVideoLink: PropTypes.string,
    videoLink: PropTypes.string,
    backgroundColor: PropTypes.string,
    backgroundImage: PropTypes.string,
    previewImage: PropTypes.string,
    genre: PropTypes.string,
    released: PropTypes.number,
    rating: PropTypes.number,
    scoresCount: PropTypes.number,
    runTime: PropTypes.number,
    description: PropTypes.string,
    director: PropTypes.string,
    starring: PropTypes.arrayOf(PropTypes.string),
    isFavorite: PropTypes.bool,
  }),
  genre: PropTypes.string.isRequired,
  onGenreClick: PropTypes.func.isRequired,
  genres: PropTypes.instanceOf(Set).isRequired,
  onShowMoreButtonClick: PropTypes.func.isRequired,
  onOpenCloseVideoButtonClick: PropTypes.func.isRequired,
  filmsCounter: PropTypes.number.isRequired,
};

export default MainPage;
