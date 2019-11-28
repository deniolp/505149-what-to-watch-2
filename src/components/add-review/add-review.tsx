import * as React from 'react';
import {Redirect, Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {ActionCreator, Operation} from '../../reducer/reducer';
import Avatar from '../avatar/avatar';
import {getIsReviewSending, getDidReviewSend} from '../../reducer/selectors';
import {Film, User} from "../../types";

interface Props {
  films: Film[];
  user: User;
  onSubmitForm: (review: {
    rating: number;
    comment: string;
  }, id: number) => void;
  onLoadFilms: () => void;
  onRadioClick: () => void;
  onTextareaChange: (evt: any) => void;
  isValidated: boolean;
  isReviewSending: boolean;
  onUpdateForm: () => void;
  didReviewSend: boolean;
  history: {
    push: (path: string) => void;
  };
  match: {
    params: {
      id: number;
    };
  };
}

const AddReview = (props: Props): React.SFC => {
  const {
    films,
    user,
    onSubmitForm,
    onLoadFilms,
    onRadioClick,
    onTextareaChange,
    isValidated,
    isReviewSending,
    onUpdateForm,
    didReviewSend,
    history
  } = props;
  const formRef = React.createRef();
  let id;
  const redirect = (): void => history.push(`/film/${id}`);

  React.useEffect(() => {
    if (didReviewSend) {
      formRef.current.reset();
      onUpdateForm();
      redirect();
    }
  }, [didReviewSend]);

  const handleFormSubmit = (comment, rating, filmId: number): void => {
    const review = {
      rating,
      comment
    };
    onSubmitForm(review, filmId);
  };

  const renderFilm = (film: Film): React.SFC => {
    return <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={film.backgroundImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Link to={`/`} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/film/${film.id}`} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
          <Avatar user={user}/>
        </header>

        <div className="movie-card__poster movie-card__poster--small">
          <img src={film.posterImage} alt={film.name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form
          action="#"
          className="add-review__form"
          onSubmit={(evt): void => {
            evt.preventDefault();
            const data = new FormData(evt.currentTarget);
            handleFormSubmit(data.get(`review-text`), data.get(`rating`), film.id);
          }}
          ref={formRef}
        >
          <div className="rating">
            <div className="rating__stars">
              <input className="rating__input" id="star-1" type="radio" name="rating" value="1" onClick={(): void => onRadioClick()} defaultChecked/>
              <label className="rating__label" htmlFor="star-1">Rating 1</label>

              <input className="rating__input" id="star-2" type="radio" name="rating" value="2" onClick={(): void => onRadioClick()} />
              <label className="rating__label" htmlFor="star-2">Rating 2</label>

              <input className="rating__input" id="star-3" type="radio" name="rating" value="3" onClick={(): void => onRadioClick()} />
              <label className="rating__label" htmlFor="star-3">Rating 3</label>

              <input className="rating__input" id="star-4" type="radio" name="rating" value="4" onClick={(): void => onRadioClick()} />
              <label className="rating__label" htmlFor="star-4">Rating 4</label>

              <input className="rating__input" id="star-5" type="radio" name="rating" value="5" onClick={(): void => onRadioClick()} />
              <label className="rating__label" htmlFor="star-5">Rating 5</label>
            </div>
          </div>

          <div className="add-review__text">
            <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="First select rating. Then write review (not less than 50, not more than 400)." onChange={(evt): void => onTextareaChange(evt)}></textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit" disabled={isValidated && !isReviewSending ? false : true}>Post</button>
            </div>

          </div>
        </form>
      </div>
    </section>;
  };

  if (films.length !== 0) {
    id = props.match.params.id;
    const film = films.find((it) => it.id === +id);
    if (!film) {
      return <Redirect to="/"></Redirect>;
    }
    return renderFilm(film);
  } else {
    onLoadFilms();
  }
  return null;
};

const mapStateToProps = (state, ownProps): object => Object.assign({}, ownProps, {
  isReviewSending: getIsReviewSending(state),
  didReviewSend: getDidReviewSend(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmitForm: (review, id): void => {
    dispatch(ActionCreator.blockForm(true));
    dispatch(Operation.postReview(review, id));
  },
  onUpdateForm: (): void => dispatch(ActionCreator.cleanForm(false)),
  onLoadFilms: (): void => dispatch(Operation.loadFilms()),
});

export {AddReview};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(withRouter(AddReview)));

