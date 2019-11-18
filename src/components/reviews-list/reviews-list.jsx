import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Review from '../review/review';

const ReviewsList = (props) => {
  const {reviews} = props;

  let reviewsFirstPart;
  let reviewsSecondPart;
  if (reviews) {
    const middle = Math.floor(reviews.length / 2);
    reviewsFirstPart = reviews.slice(0, middle);
    reviewsSecondPart = reviews.slice(middle, reviews.length);
  }

  return <div className="movie-card__reviews movie-card__row">
    <div className="movie-card__reviews-col">
      {reviewsFirstPart && reviewsFirstPart.map((review) => <Review review={review} key={review.id}></Review>)}
    </div>
    <div className="movie-card__reviews-col">
      {reviewsSecondPart && reviewsSecondPart.map((review) => <Review review={review} key={review.id}></Review>)}
    </div>
  </div>;
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    date: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  })),
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  reviews: state.comments,
});

export {ReviewsList};
export default connect(mapStateToProps, null)(ReviewsList);
