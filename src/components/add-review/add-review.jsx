import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";

import {ActionCreator, Operation} from '../../reducer/reducer';
import Avatar from '../avatar/avatar';

const AddReview = (props) => {
  const {films,
    user,
    onSubmitForm,
    onLoadFilms,
    onRadioClick,
    onTextareaChange,
    isValidated,
    isReviewSending,
    onUpdateForm,
    didReviewSend,
    history} = props;
  const formRef = React.createRef();
  let id;

  useEffect(() => {
    if (didReviewSend) {
      formRef.current.reset();
      onUpdateForm();
      redirect();
    }
  }, [isReviewSending]);

  const redirect = () => history.push(`/film/${id}`);

  const handleFormSubmit = (comment, rating, filmId) => {
    const review = {
      rating,
      comment
    };
    onSubmitForm(review, filmId);
  };

  const renderFilm = (film) => {
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
          onSubmit={(evt) => {
            evt.preventDefault();
            const data = new FormData(evt.currentTarget);
            handleFormSubmit(data.get(`review-text`), data.get(`rating`), film.id);
          }}
          ref={formRef}
        >
          <div className="rating">
            <div className="rating__stars">
              <input className="rating__input" id="star-1" type="radio" name="rating" value="1" onClick={() => onRadioClick()} defaultChecked/>
              <label className="rating__label" htmlFor="star-1">Rating 1</label>

              <input className="rating__input" id="star-2" type="radio" name="rating" value="2" onClick={() => onRadioClick()} />
              <label className="rating__label" htmlFor="star-2">Rating 2</label>

              <input className="rating__input" id="star-3" type="radio" name="rating" value="3" onClick={() => onRadioClick()} />
              <label className="rating__label" htmlFor="star-3">Rating 3</label>

              <input className="rating__input" id="star-4" type="radio" name="rating" value="4" onClick={() => onRadioClick()} />
              <label className="rating__label" htmlFor="star-4">Rating 4</label>

              <input className="rating__input" id="star-5" type="radio" name="rating" value="5" onClick={() => onRadioClick()} />
              <label className="rating__label" htmlFor="star-5">Rating 5</label>
            </div>
          </div>

          <div className="add-review__text">
            <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="First select rating. Then write review (not less than 50, not more than 400)." onChange={(evt) => onTextareaChange(evt)}></textarea>
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

AddReview.propTypes = {
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
  onSubmitForm: PropTypes.func.isRequired,
  onLoadFilms: PropTypes.func.isRequired,
  onRadioClick: PropTypes.func.isRequired,
  onTextareaChange: PropTypes.func.isRequired,
  onUpdateForm: PropTypes.func.isRequired,
  isValidated: PropTypes.bool.isRequired,
  isReviewSending: PropTypes.bool.isRequired,
  didReviewSend: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isReviewSending: state.isReviewSending,
  didReviewSend: state.isReviewSending,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmitForm: (review, id) => {
    dispatch(ActionCreator.blockForm(true));
    dispatch(Operation.postReview(review, id));
  },
  onUpdateForm: () => dispatch(ActionCreator.cleanForm(false)),
  onLoadFilms: () => dispatch(Operation.loadFilms()),
});

export {AddReview};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddReview));

