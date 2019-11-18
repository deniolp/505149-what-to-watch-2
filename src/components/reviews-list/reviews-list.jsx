import React from 'react';
import PropTypes from 'prop-types';

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
      {reviewsFirstPart && reviewsFirstPart.map((review) => <Review review={review} key={`${review.author}${review.time}`}></Review>)}
    </div>
    <div className="movie-card__reviews-col">
      {reviewsSecondPart && reviewsSecondPart.map((review) => <Review review={review} key={`${review.author}${review.time}`}></Review>)}
    </div>
  </div>;
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  })),
};

export default ReviewsList;
