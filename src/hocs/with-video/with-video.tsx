import * as React from 'react';

const withVideo = ((Component: React.SFC): React.SFC => {
  const WithVideo = (props): React.SFC => {
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
