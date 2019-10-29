import React from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = (props) => {
  const {preview} = props;
  const format = preview.match(/\w+$/);
  return <video autoPlay muted width="280" height="175">
    <source
      src={preview}
      type={`video/${format}`}
    ></source>
  </video>;
};

VideoPlayer.propTypes = {
  preview: PropTypes.string.isRequired,
};

export default VideoPlayer;
