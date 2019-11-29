import * as React from 'react';
import {Link} from 'react-router-dom';

import VideoPlayer from '../video-player/video-player';
import {Film} from "../../types";

interface Props {
  film: Film;
  setIsPreviewPlaying: (isPreviewPlaying: boolean) => void;
  isPreviewPlaying: boolean;
  setIsMouseOver: (isPreviewPlaying: boolean) => void;
  isMouseOver: boolean;
}

const FilmCard = (props: Props): React.SFC => {
  const {film, isPreviewPlaying, setIsPreviewPlaying, isMouseOver, setIsMouseOver} = props;

  let timerId;
  const cardMouseEnterHandler = (): void => setIsPreviewPlaying(true);
  const clearTimer = (): void => timerId && clearTimeout(timerId);

  React.useEffect(() => {
    if (isMouseOver) {
      timerId = setTimeout(cardMouseEnterHandler, 1000);
      return (): void => {
        clearTimer();
      };
    } else {
      clearTimer();
      return (): void => {};
    }
  }, [isMouseOver]);

  return <article
    className="small-movie-card catalog__movies-card"
    onMouseEnter={(): void => {
      setIsMouseOver(true);
    }}
    onMouseLeave={(): void => {
      setIsMouseOver(false);
      setIsPreviewPlaying(false);
    }}
  >
    <Link
      to={`/film/${film.id}`}
      onClick={(): void => clearTimer()}
    >
      <div className="small-movie-card__image">
        <VideoPlayer
          preview={film.previewVideoLink}
          poster={film.posterImage}
          isPreviewPlaying={isPreviewPlaying}
        >
        </VideoPlayer>
      </div>
    </Link>
    <h3 className="small-movie-card__title">
      <Link
        to={`/film/${film.id}`}
        onClick={(): void => clearTimer()}
        className="small-movie-card__link"
      >
        {film.name}
      </Link>
    </h3>
  </article>;
};

export default React.memo(FilmCard);
