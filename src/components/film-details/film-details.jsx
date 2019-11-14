import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import Header from '../header/header';
import Tabs from '../tabs/tabs';
import withLabel from '../../hocs/with-label/with-label';
import FilmsList from '../films-list/films-list';
import Footer from '../footer/footer';
import filmsListMock from '../../mocks/films';

const TabsWrapped = withLabel(Tabs);

const FilmDetails = (props) => {
  let {film} = props;

  const id = props.match.params.id;
  if (!film) {
    film = filmsListMock.find((it) => it.id === +id);
    if (!film) {
      return <Redirect to="/"></Redirect>;
    }
  }
  const filteredByGenreFilms = filmsListMock.filter((item) => item.genre === film.genre && item.name !== film.name);

  return <React.Fragment>
    <section className="movie-card movie-card--full">
      <div className="movie-card__hero">
        <div className="movie-card__bg">
          <img src="/img/bg-the-grand-budapest-hotel.jpg" alt={film.name} />
        </div>
        <Header />
        <div className="movie-card__wrap">
          <div className="movie-card__desc">
            <h2 className="movie-card__title">{film.name}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{film.genre}</span>
              <span className="movie-card__year">{film.year}</span>
            </p>

            <div className="movie-card__buttons">
              <button className="btn btn--play movie-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list movie-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
              </button>
              <a href="add-review.html" className="btn movie-card__button">Add review</a>
            </div>
          </div>
        </div>
      </div>

      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img src="/img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
          </div>
          <TabsWrapped film={film}/>
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

FilmDetails.propTypes = {
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
  match: PropTypes.object.isRequired,
};

export default FilmDetails;
