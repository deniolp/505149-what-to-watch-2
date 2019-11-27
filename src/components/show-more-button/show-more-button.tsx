import * as React from 'react';

interface Props {
  onShowMoreButtonClick: () => void;
  shouldShowButton: boolean;
}

const ShowMoreButton = (props: Props) => {
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

export default React.memo(ShowMoreButton);
