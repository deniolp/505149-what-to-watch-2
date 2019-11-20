import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import Header from '../header/header';
import Tabs from '../tabs/tabs';
import withLabel from '../../hocs/with-label/with-label';
import FilmsList from '../films-list/films-list';
import Footer from '../footer/footer';
import {Operation} from '../../reducer/reducer';

const TabsWrapped = withLabel(Tabs);

const FilmDetails = (props) => {
  const {onOpenCloseVideoButtonClick, onLoadFilms, films, isAuthorizationRequired} = props;

  const renderFilms = (film, filteredByGenreFilms) => {
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
                  onClick={() => onOpenCloseVideoButtonClick(film)}
                >
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

    return renderFilms(film, filteredByGenreFilms);
  } else {
    onLoadFilms();
  }
  return null;
};

FilmDetails.propTypes = {
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
  match: PropTypes.object.isRequired,
  onOpenCloseVideoButtonClick: PropTypes.func.isRequired,
  onLoadFilms: PropTypes.func.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  films: state.films,
});

const mapDispatchToProps = (dispatch) => ({
  onLoadFilms: () => dispatch(Operation.loadFilms()),
});

export {FilmDetails};
export default connect(mapStateToProps, mapDispatchToProps)(FilmDetails);
