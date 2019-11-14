import React from 'react';
import PropTypes from 'prop-types';

const BigPlayer = (props) => {
  const {playingFilm, onPlayButtonClick} = props;

  return <div className="player">
    <video src={playingFilm.src} className="player__video" poster="/img/player-poster.jpg"></video>

    <button
      type="button"
      className="player__exit"
      onClick={() => onPlayButtonClick(false)}
    >
    Exit
    </button>
    <div className="player__controls">
      <div className="player__controls-row">
        <div className="player__time">
          <progress className="player__progress" value="30" max="100"></progress>
          <div
            className="player__toggler"
            style={{
              left: 30 + `%`,
            }}
          >Toggler</div>
        </div>
        <div className="player__time-value">1:30:29</div>
      </div>

      <div className="player__controls-row">
        <button type="button" className="player__play">
          <svg viewBox="0 0 19 19" width="19" height="19">
            <use xlinkHref="#play-s"></use>
          </svg>
          <span>Play</span>
        </button>
        <div className="player__name">Transpotting</div>

        <button type="button" className="player__full-screen">
          <svg viewBox="0 0 27 27" width="27" height="27">
            <use xlinkHref="#full-screen"></use>
          </svg>
          <span>Full screen</span>
        </button>
      </div>
    </div>
  </div>;
};

BigPlayer.propTypes = {
  playingFilm: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    ratingLevel: PropTypes.string.isRequired,
    ratingCount: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    reviews: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })),
  }),
  onPlayButtonClick: PropTypes.func.isRequired,
};

export default BigPlayer;
