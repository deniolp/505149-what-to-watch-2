import * as React from 'react';

const withVideo = ((Component) => {
  const WithVideo = (props) => {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(true);
    return <Component
      {...props}
      isPlaying={isPlaying}
      setIsPlaying={setIsPlaying}
      progress={progress}
      setProgress={setProgress}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />;
  };

  WithVideo.propTypes = {};

  return WithVideo;
});

export default withVideo;
