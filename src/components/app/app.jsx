import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import MainPage from '../main-page/main-page';
import FilmDetails from '../film-details/film-details';
import BigPlayer from '../big-player/big-player';
import withVideo from '../../hocs/with-video/with-video';
import {ActionCreator, Operation} from '../../reducer/reducer';

const BigPlayerWrapped = withVideo(BigPlayer);

const App = (props) => {
  const {films, genre, onGenreClick, filmsCounter, onShowMoreButtonClick, playingFilm, onOpenCloseVideoButtonClick, onLoadComments} = props;
  const genres = new Set().add(`All genres`);
  films.forEach((film) => genres.add(film.genre));

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
      onLoadComments(routerProps.match.params.id);
      return playingFilm ?
        <BigPlayerWrapped
          playingFilm={playingFilm}
          onOpenCloseVideoButtonClick={onOpenCloseVideoButtonClick}
        /> : <FilmDetails
          {...routerProps}
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
    posterImage: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
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
  genre: PropTypes.string.isRequired,
  onGenreClick: PropTypes.func.isRequired,
  onShowMoreButtonClick: PropTypes.func.isRequired,
  onOpenCloseVideoButtonClick: PropTypes.func.isRequired,
  onLoadComments: PropTypes.func.isRequired,
  filmsCounter: PropTypes.number.isRequired,
  playingFilm: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      posterImage: PropTypes.string.isRequired,
      previewVideoLink: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      released: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      scoresCount: PropTypes.number.isRequired,
      runTime: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
      starring: PropTypes.arrayOf(PropTypes.string).isRequired,
      isFavorite: PropTypes.bool.isRequired,
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
    dispatch(ActionCreator.resetFilmsCounter());
  },
  onShowMoreButtonClick: () => dispatch(ActionCreator.increaseFilmsCounter()),
  onOpenCloseVideoButtonClick: (film) => dispatch(ActionCreator.setPlayingFilm(film)),
  onLoadComments: (id) => dispatch(Operation.loadComments(id)),
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
