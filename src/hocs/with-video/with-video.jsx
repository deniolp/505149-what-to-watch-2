import React, {useState} from 'react';

const withVideo = ((Component) => {
  const WithVideo = (props) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    return <Component
      {...props}
      isPlaying={isPlaying}
      setIsPlaying={setIsPlaying}
      progress={progress}
      setProgress={setProgress}
    />;
  };

  WithVideo.propTypes = {};

  return WithVideo;
});

export default withVideo;
