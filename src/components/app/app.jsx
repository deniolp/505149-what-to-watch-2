import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import MainPage from '../main-page/main-page';
import FilmDetails from '../film-details/film-details';
import BigPlayer from '../big-player/big-player';
import withVideo from '../../hocs/with-video/with-video';
import {ActionCreator} from '../../reducer/reducer';
import filmsMocks from '../../mocks/films';

const BigPlayerWrapped = withVideo(BigPlayer);

const App = (props) => {
  const {films, genre, onGenreClick, filmsCounter, onShowMoreButtonClick, playingFilm, onOpenCloseVideoButtonClick} = props;
  const genres = new Set().add(`All genres`);
  filmsMocks.forEach((film) => genres.add(film.genre));

  return <Switch>
    <Route path="/" exact render={() => {
      return playingFilm ? <BigPlayerWrapped
        playingFilm={playingFilm}
        onOpenCloseVideoButtonClick={onOpenCloseVideoButtonClick}
      /> : <MainPage
        films={films}
        genre={genre}
        onGenreClick={onGenreClick}
        genres={genres}
        filmsCounter={filmsCounter}
        onShowMoreButtonClick={onShowMoreButtonClick}
        onOpenCloseVideoButtonClick={onOpenCloseVideoButtonClick}
      />;
    }}
    />
    <Route path="/film/:id" exact render={(routerProps) => {
      return playingFilm ?
        <BigPlayerWrapped
          playingFilm={playingFilm}
          onOpenCloseVideoButtonClick={onOpenCloseVideoButtonClick}
        /> : <FilmDetails
          {...routerProps}
          film={films.find((it) => it.id === +routerProps.match.params.id)}
          onOpenCloseVideoButtonClick={onOpenCloseVideoButtonClick}
        />;
    }}
    />
    <Redirect from='*' to='/' />
  </Switch>;
};

App.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
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
  })),
  genre: PropTypes.string.isRequired,
  onGenreClick: PropTypes.func.isRequired,
  onShowMoreButtonClick: PropTypes.func.isRequired,
  onOpenCloseVideoButtonClick: PropTypes.func.isRequired,
  filmsCounter: PropTypes.number.isRequired,
  playingFilm: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
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
  ]).isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  genre: state.genre,
  films: state.films,
  filmsCounter: state.filmsCounter,
  playingFilm: state.playingFilm,
});

const mapDispatchToProps = (dispatch) => ({
  onGenreClick: (selectedGenre) => {
    dispatch(ActionCreator.changeGenre(selectedGenre));
    dispatch(ActionCreator.getFilms(selectedGenre));
    dispatch(ActionCreator.resetFilmsCounter());
  },
  onShowMoreButtonClick: () => dispatch(ActionCreator.increaseFilmsCounter()),
  onOpenCloseVideoButtonClick: (film) => dispatch(ActionCreator.setPlayingFilm(film)),
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
