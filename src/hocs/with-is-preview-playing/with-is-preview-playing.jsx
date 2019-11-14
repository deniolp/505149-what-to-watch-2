import React, {useState} from 'react';

const withIsPreviewPlaying = ((Component) => {
  const WithIsPreviewPlaying = (props) => {
    const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
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
