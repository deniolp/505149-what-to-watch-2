import * as React from 'react';

const withIsPreviewPlaying = ((Component: React.SFC): React.SFC => {
  const WithIsPreviewPlaying = (props): React.SFC => {
    const [isPreviewPlaying, setIsPreviewPlaying] = React.useState(false);
    const [isMouseOver, setIsMouseOver] = React.useState(false);
    return <Component
      {...props}
      isPreviewPlaying={isPreviewPlaying}
      setIsPreviewPlaying={setIsPreviewPlaying}
      isMouseOver={isMouseOver}
      setIsMouseOver={setIsMouseOver}
    />;
  };

  WithIsPreviewPlaying.propTypes = {};

  return WithIsPreviewPlaying;
});

export default withIsPreviewPlaying;
