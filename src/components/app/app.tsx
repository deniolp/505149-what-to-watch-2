import * as React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import MainPage from '../main-page/main-page';
import FilmDetails from '../film-details/film-details';
import BigPlayer from '../big-player/big-player';
import SignIn from '../sign-in/sign-in';
import AddReview from '../add-review/add-review';
import Favorites from '../favorites/favorites';
import withVideo from '../../hocs/with-video/with-video';
import withPrivate from '../../hocs/with-private/with-private';
import withValidated from '../../hocs/with-validated/with-validated';
import withError from '../../hocs/with-error/with-error';
import {ActionCreator, Operation} from '../../reducer/reducer';
import {Film, User} from "../../types";

interface Props {
  films: Film[];
  genre: string;
  onGenreClick: (genre: string) => void;
  filmsCounter: number;
  onShowMoreButtonClick: () => void;
  playingFilm: boolean | Film;
  onOpenCloseVideoButtonClick: (film: Film) => void;
  onLoadComments: (id: number) => void;
  onLoadFavorites: () => void;
  onPostFavorite: (id: number, isFavorite: boolean, isPromo: boolean) => void;
  isAuthorizationRequired: boolean;
  user: User;
  promo: Film;
  error: string;
}

const BigPlayerWrapped = withVideo(BigPlayer);

const App = (props: Props): React.SFC => {
  const {films,
    genre,
    onGenreClick,
    filmsCounter,
    onShowMoreButtonClick,
    playingFilm,
    onOpenCloseVideoButtonClick,
    onLoadComments,
    onLoadFavorites,
    onPostFavorite,
    isAuthorizationRequired,
    user,
    promo,
    error,
  } = props;
  const genres = new Set().add(`All genres`);
  films.forEach((film) => genres.add(film.genre));

  return error ? <h1>{error}</h1> : <Switch>
    <Route path="/" exact render={(): React.SFC => {
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
        promo={promo}
        onPostFavorite={onPostFavorite}
        isAuthorizationRequired={isAuthorizationRequired}
      />;
    }}
    />
    <Route path="/film/:id" exact render={(routerProps): React.SFC => {
      onLoadComments(routerProps.match.params.id);
      return playingFilm ?
        <BigPlayerWrapped
          playingFilm={playingFilm}
          onOpenCloseVideoButtonClick={onOpenCloseVideoButtonClick}
        /> : <FilmDetails
          {...routerProps}
          onOpenCloseVideoButtonClick={onOpenCloseVideoButtonClick}
          isAuthorizationRequired={isAuthorizationRequired}
          onPostFavorite={onPostFavorite}
        />;
    }}
    />
    <Route path="/film/:id/review" exact render={(routerProps): React.SFC => {
      const AddReviewWrapped = withPrivate(withValidated(AddReview));
      return <AddReviewWrapped
        {...routerProps}
        films={films}
        user={user}
      />;
    }}
    />
    <Route path="/login" exact render={(): React.SFC => {
      const SignInWrapped = withError(SignIn);
      return <SignInWrapped
        isAuthorizationRequired={isAuthorizationRequired}
      />;
    }}
    />
    <Route path="/mylist" exact render={(routerProps): React.SFC => {
      const FavoritesWrapped = withPrivate(Favorites);
      onLoadFavorites();
      return <FavoritesWrapped
        {...routerProps}
        films={films}
        user={user}
      />;
    }}
    />
    <Redirect from='*' to='/' />
  </Switch>;
};

const mapStateToProps = (state, ownProps): object => Object.assign({}, ownProps, {
  genre: state.genre,
  films: state.films,
  promo: state.promo,
  filmsCounter: state.filmsCounter,
  playingFilm: state.playingFilm,
  isAuthorizationRequired: state.isAuthorizationRequired,
  user: state.user,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({
  onGenreClick: (selectedGenre): void => {
    dispatch(ActionCreator.changeGenre(selectedGenre));
    dispatch(ActionCreator.resetFilmsCounter());
  },
  onShowMoreButtonClick: (): void => dispatch(ActionCreator.increaseFilmsCounter()),
  onOpenCloseVideoButtonClick: (film): void => dispatch(ActionCreator.setPlayingFilm(film)),
  onLoadComments: (id): void => dispatch(Operation.loadComments(id)),
  onLoadFavorites: (): void => dispatch(Operation.loadFavorites()),
  onPostFavorite: (id, isFavorite, isPromo): void => dispatch(Operation.postFavorite(id, isFavorite, isPromo)),
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(App));
