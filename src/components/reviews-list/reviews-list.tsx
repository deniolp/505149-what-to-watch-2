import * as React from 'react';
import {connect} from 'react-redux';

import Review from '../review/review';
import {getReviews} from '../../reducer/selectors';
import {Review as Rev} from "../../types";

interface Props {
  reviews: Rev[];
}

const ReviewsList = (props: Props): React.SFC => {
  const {reviews} = props;

  let reviewsFirstPart;
  let reviewsSecondPart;
  if (reviews) {
    const middle = Math.floor(reviews.length / 2);
    const filteredReviews = reviews.slice().sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
    reviewsFirstPart = filteredReviews.slice(0, middle);
    reviewsSecondPart = filteredReviews.slice(middle, reviews.length);
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

const mapStateToProps = (state, ownProps): object => Object.assign({}, ownProps, {
  reviews: getReviews(state),
});

export {ReviewsList};
export default connect(mapStateToProps, null)(React.memo(ReviewsList));
