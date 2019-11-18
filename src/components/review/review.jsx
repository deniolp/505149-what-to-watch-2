import React from 'react';
import PropTypes from 'prop-types';

const Review = (props) => {
  const {review} = props;
  const getDate = (data) => {
    const year = data.getFullYear();
    const month = data.toLocaleString(`en-us`, {month: `long`});
    const date = data.getDate();
    return month + ` ` + date + `, ` + year;
  };

  return <div className="review">
    <blockquote className="review__quote">
      <p className="review__text">{review.comment}</p>

      <footer className="review__details">
        <cite className="review__author">{review.user.name}</cite>
        <time className="review__date" dateTime={review.date}>{getDate(new Date(review.date))}</time>
      </footer>
    </blockquote>

    <div className="review__rating">{review.rating}</div>
  </div>;
};

Review.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    date: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }),
};

export default Review;
