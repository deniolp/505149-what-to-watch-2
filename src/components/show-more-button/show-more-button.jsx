import React from 'react';
import PropTypes from 'prop-types';

const ShowMoreButton = (props) => {
  const {onShowMoreButtonClick, shouldShowButton} = props;

  return shouldShowButton && <div className="catalog__more">
    <button
      className="catalog__button"
      type="button"
      onClick={() => onShowMoreButtonClick()}
    >
      Show more
    </button>
  </div>;
};

ShowMoreButton.propTypes = {
  onShowMoreButtonClick: PropTypes.func.isRequired,
  shouldShowButton: PropTypes.bool.isRequired,
};

export default ShowMoreButton;
