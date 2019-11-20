import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {ActionCreator, Operation} from '../../reducer/reducer';
import Avatar from '../avatar/avatar';

const AddReview = (props) => {
  const {isAuthorizationRequired, films, user, submitForm} = props;
  const id = props.match.params.id;
  const film = films.find((it) => it.id === +id);
  if (!film) {
    return <Redirect to="/"></Redirect>;
  }

  const handleFormSubmit = (comment, rating, filmId) => {
    const review = {
      rating,
      comment
    };
    submitForm(review, filmId);
  };

  return !isAuthorizationRequired ? <section className="movie-card     movie-card--full">
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
      <form action="#" className="add-review__form" onSubmit={(evt) => {
        evt.preventDefault();
        const data = new FormData(evt.currentTarget);
        handleFormSubmit(data.get(`review-text`), data.get(`rating`), id);
      }}>
        <div className="rating">
          <div className="rating__stars">
            <input className="rating__input" id="star-1" type="radio" name="rating" value="1"/>
            <label className="rating__label" htmlFor="star-1">Rating 1</label>

            <input className="rating__input" id="star-2" type="radio" name="rating" value="2" />
            <label className="rating__label" htmlFor="star-2">Rating 2</label>

            <input className="rating__input" id="star-3" type="radio" name="rating" value="3" defaultChecked />
            <label className="rating__label" htmlFor="star-3">Rating 3</label>

            <input className="rating__input" id="star-4" type="radio" name="rating" value="4" />
            <label className="rating__label" htmlFor="star-4">Rating 4</label>

            <input className="rating__input" id="star-5" type="radio" name="rating" value="5" />
            <label className="rating__label" htmlFor="star-5">Rating 5</label>
          </div>
        </div>

        <div className="add-review__text">
          <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"></textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>

        </div>
      </form>
    </div>

  </section> : <Redirect to="/"></Redirect>;
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
  isAuthorizationRequired: PropTypes.bool.isRequired,
  submitForm: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
};

const mapDispatchToProps = (dispatch) => ({
  submitForm: (review, id) => {
    dispatch(ActionCreator.blockForm(true));
    dispatch(Operation.postReview(review, id));
  },
  updateForm: () => dispatch(ActionCreator.cleanForm(false)),
});

export {AddReview};
export default connect(null, mapDispatchToProps)(AddReview);

