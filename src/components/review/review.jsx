import React from 'react';
import PropTypes from 'prop-types';

const Review = (props) => {
  const {review} = props;

  return <div className="review">
    <blockquote className="review__quote">
      <p className="review__text">{review.text}</p>

      <footer className="review__details">
        <cite className="review__author">{review.author}</cite>
        <time className="review__date" dateTime={review.time}>December 24, 2016</time>
      </footer>
    </blockquote>

    <div className="review__rating">{review.rating}</div>
  </div>;
};

Review.propTypes = {
  review: PropTypes.shape({
    text: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }),
};

export default Review;
