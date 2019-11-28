import * as React from 'react';

import {Film} from "../../types";

interface Props {
  playingFilm: Film;
  onOpenCloseVideoButtonClick: (bool: boolean) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: any) => void;
  progress: number;
  setProgress: (progress: number) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const BigPlayer = (props: Props): React.SFC => {
  const {
    playingFilm,
    onOpenCloseVideoButtonClick,
    isPlaying,
    setIsPlaying,
    progress,
    setProgress,
    isLoading,
    setIsLoading
  } = props;
  const videoRef = React.useRef();
  const format = playingFilm.videoLink.match(/\w+$/);

  React.useEffect(() => {
    videoRef.current.oncanplaythrough = (): void => {
      setIsLoading(false);
      videoRef.current.poster = ``;
    };
  }, []);

  React.useEffect(() => {
    if (isPlaying) {
      videoRef.current.onended = (): void => {
        videoRef.current.load();
        setIsPlaying(false);
      };
      videoRef.current.ontimeupdate = (): void => {
        if (videoRef.current) {
          setProgress(videoRef.current.currentTime);
        }
      };
      try {
        videoRef.current.play();
      } catch (_err) {
        throw _err;
      }
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  const forProgressBar = progress && Math.round(progress / playingFilm.runTime * 100);

  const secondsToTimeElapsed = (seconds): string => {
    seconds = Math.round(seconds);
    let hours = 0;
    let minutes = 0;

    hours = Math.floor(seconds / 3600);
    seconds = seconds % 3600;
    minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;

    const time = `${String(hours).padStart(2, `0`)}:${String(minutes).padStart(2, `0`)}:${String(seconds).padStart(2, `0`)}`;
    return time;
  };

  return <div className="player">
    <video
      preload = "auto"
      className="player__video"
      poster="/img/player-poster.jpg"
      ref={videoRef}
      width="100%"
      height="100%"
    >
      <source
        src={playingFilm.videoLink}
        type={`video/${format}`}
      ></source>
    </video>
    <button
      type="button"
      className="player__exit"
      onClick={(): void => onOpenCloseVideoButtonClick(false)}
    >
    Exit
    </button>
    <div className="player__controls">
      <div className="player__controls-row">
        <div className="player__time">
          <progress
            className="player__progress"
            value={forProgressBar}
            max="100"></progress>
          <div
            className="player__toggler"
            style={{
              left: `${forProgressBar}%`,
            }}
          >Toggler</div>
        </div>
        <div className="player__time-value">{(playingFilm.runTime - progress > 0) ? secondsToTimeElapsed(playingFilm.runTime * 60 - progress) : `00:00:00`}</div>
      </div>

      <div className="player__controls-row">
        <button
          type="button"
          className="player__play"
          onClick={(): void => setIsPlaying((oldState) => !oldState)}
          disabled={isLoading}
        >
          <svg viewBox="0 0 19 19" width="19" height="19">
            {!isPlaying ? <use xlinkHref="#play-s"></use> : <use xlinkHref="#pause"></use>}
          </svg>
          <span>Play</span>
        </button>
        <div className="player__name">{playingFilm.name}</div>

        <button
          type="button"
          className="player__full-screen"
          onClick={(): void => {
            videoRef.current.requestFullscreen();
          }}
        >
          <svg viewBox="0 0 27 27" width="27" height="27">
            <use xlinkHref="#full-screen"></use>
          </svg>
          <span>Full screen</span>
        </button>
      </div>
    </div>
  </div>;
};

export default React.memo(BigPlayer);
