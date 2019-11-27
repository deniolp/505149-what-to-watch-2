import * as React from 'react';

const withIsPreviewPlaying = ((Component) => {
  const WithIsPreviewPlaying = (props) => {
    const [isPreviewPlaying, setIsPreviewPlaying] = React.useState(false);
    return <Component
      {...props}
      isPreviewPlaying={isPreviewPlaying}
      setIsPreviewPlaying={setIsPreviewPlaying}
    />;
  };

  WithIsPreviewPlaying.propTypes = {};

  return WithIsPreviewPlaying;
});

export default withIsPreviewPlaying;
