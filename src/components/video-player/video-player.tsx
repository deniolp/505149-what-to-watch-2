import * as React from 'react';

interface Props {
  preview: string;
  poster: string;
  isPreviewPlaying: boolean;
}

const VideoPlayer = (props: Props) => {
  const {preview, poster, isPreviewPlaying} = props;
  const format = preview.match(/\w+$/);
  const videoRef = React.createRef();

  React.useEffect(() => {
    if (isPreviewPlaying) {
      try {
        videoRef.current.play();
      } catch (_err) {
        throw _err;
      }
    } else {
      videoRef.current.pause();
      videoRef.current.load();
    }
  }, [isPreviewPlaying]);

  return <video
    ref={videoRef}
    preload = "none"
    muted
    poster={poster}
    width="100%"
    height="100%"
  >
    <source
      src={preview}
      type={`video/${format}`}
    ></source>
  </video>;
};

export default React.memo(VideoPlayer);
