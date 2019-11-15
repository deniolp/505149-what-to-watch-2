import React, {useState} from 'react';

const withVideo = ((Component) => {
  const WithVideo = (props) => {
    const [isPlaying, setIsPlaying] = useState(false);
    return <Component
      {...props}
      isPlaying={isPlaying}
      setIsPlaying={setIsPlaying}
    />;
  };

  WithVideo.propTypes = {};

  return WithVideo;
});

export default withVideo;
